const express = require('express');
const User = require('../models/User');
const Message = require('../models/Message');
const router = express.Router();

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.headers['user-id']);
        if (user && user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Access denied. Admins only.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get All Users & Stats
router.get('/stats', isAdmin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalMessages = await Message.countDocuments();
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        
        // Summing real token usage from the database
        const tokenUsage = await Message.aggregate([
            { $group: { _id: null, total: { $sum: "$tokens" } } }
        ]);
        const estimatedTokens = tokenUsage[0]?.total || 0;
        const estimatedCost = (estimatedTokens / 1000) * 0.002; // GPT-3.5 pricing

        res.json({
            totalUsers,
            totalMessages,
            estimatedTokens,
            estimatedCost: estimatedCost.toFixed(4),
            users
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Deactivate/Activate User
router.post('/toggle-status', isAdmin, async (req, res) => {
    try {
        const { targetUserId } = req.body;
        const user = await User.findById(targetUserId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        user.role = user.role === 'banned' ? 'user' : 'banned';
        await user.save();
        res.json({ message: `User status updated to ${user.role}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const Notification = require('../models/Notification');
const Config = require('../models/Config');

// Get Latest Notification (Public)
router.get('/notifications/latest', async (req, res) => {
    try {
        const notification = await Notification.findOne().sort({ createdAt: -1 });
        res.json(notification);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get System Config
router.get('/config', isAdmin, async (req, res) => {
    try {
        let config = await Config.findOne();
        if (!config) {
            config = new Config();
            await config.save();
        }
        res.json(config);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update System Config
router.post('/config', isAdmin, async (req, res) => {
    try {
        const update = req.body;
        let config = await Config.findOne();
        if (!config) config = new Config();
        
        Object.assign(config, update);
        config.updatedAt = Date.now();
        await config.save();
        res.json({ message: 'Configuration updated successfully', config });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get User Analytics (Token usage per user)
router.get('/user-analytics', isAdmin, async (req, res) => {
    try {
        const analytics = await Message.aggregate([
            { $group: { 
                _id: "$user", 
                totalTokens: { $sum: "$tokens" },
                messageCount: { $count: {} }
            }},
            { $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'userInfo'
            }},
            { $unwind: "$userInfo" },
            { $project: {
                name: "$userInfo.name",
                email: "$userInfo.email",
                totalTokens: 1,
                messageCount: 1,
                estimatedCost: { $multiply: ["$totalTokens", 0.000002] }
            }},
            { $sort: { totalTokens: -1 } }
        ]);
        res.json(analytics);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Recent Messages (System Logs)
router.get('/recent-messages', isAdmin, async (req, res) => {
    try {
        const messages = await Message.find()
            .sort({ timestamp: -1 })
            .limit(20)
            .populate('user', 'name email');
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Broadcast Message
router.post('/broadcast', isAdmin, async (req, res) => {
    try {
        const { message } = req.body;
        const notification = new Notification({ message });
        await notification.save();
        res.json({ message: 'Broadcast sent successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Specific User's Chat History (Admin Oversight)
router.get('/user-history/:targetId', isAdmin, async (req, res) => {
    try {
        const messages = await Message.find({ user: req.params.targetId })
            .sort({ timestamp: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

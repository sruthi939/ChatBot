const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'your_jwt_secret_key') {
            return res.status(500).json({ error: 'JWT Secret is missing. Please add it to the backend .env file.' });
        }
        if (mongoose.connection.readyState !== 1) {
            return res.status(500).json({ error: 'Database not connected. Please ensure MongoDB is running.' });
        }
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
    } catch (err) {
        console.error('Registration Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'your_jwt_secret_key') {
            return res.status(500).json({ error: 'JWT Secret is missing. Please add it to the backend .env file.' });
        }
        if (mongoose.connection.readyState !== 1) {
            return res.status(500).json({ error: 'Database not connected. Please ensure MongoDB is running.' });
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ error: err.message, stack: err.stack });
    }
});

// Change Password
router.post('/change-password', async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) return res.status(400).json({ message: 'Current password incorrect' });

        user.password = newPassword;
        await user.save();
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

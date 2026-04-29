const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const app = express();

// Failsafe CORS and Body Parsing
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/files', require('./routes/files'));

// Health check with DB status
app.get('/health', async (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    res.json({ status: 'active', database: dbStatus });
});

// Centralized Error Handler (Detailed)
app.use((err, req, res, next) => {
    console.error('SERVER_CRASH_ERROR:', err);
    res.status(500).json({ 
        error: 'CRITICAL_SERVER_ERROR', 
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
    });
});

// Strict MongoDB Connection Logic
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) throw new Error('MONGO_URI is missing in .env');
        
        console.log('⏳ Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000 // 5 second timeout
        });
        console.log('✅ MongoDB Connected Successfully');

        // Seed Admin
        const adminEmail = process.env.Admin_Email;
        const adminPassword = process.env.Admin_Password;
        if (adminEmail && adminPassword) {
            const adminExists = await User.findOne({ email: adminEmail });
            if (!adminExists) {
                const admin = new User({
                    name: 'System Admin',
                    email: adminEmail,
                    password: adminPassword,
                    role: 'admin'
                });
                await admin.save();
                console.log('👑 Admin Seeded');
            }
        }
    } catch (err) {
        console.error('❌ MongoDB Connection Fatal Error:', err.message);
        // Do not exit process, let health check report it
    }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

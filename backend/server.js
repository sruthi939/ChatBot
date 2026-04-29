const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/files', require('./routes/files'));

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'active', message: 'ChatBot API is running...' });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
    console.error('SERVER_ERROR:', err.stack);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

// Connect to MongoDB
if (!process.env.MONGO_URI) {
    console.error('❌ Error: MONGO_URI is not defined in .env');
} else {
    mongoose.connect(process.env.MONGO_URI)
        .then(async () => {
            console.log('✅ MongoDB Connected');
            // Seed Admin User
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
                    console.log('👑 Admin User Seeded Successfully');
                }
            }
        })
        .catch(err => {
            console.error('❌ MongoDB Connection Error:', err.message);
        });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

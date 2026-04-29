const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

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
    // Aggressively remove all spaces that might have crept into the URI
    const mongoUri = process.env.MONGO_URI.replace(/\s/g, '');
    const redactedUri = mongoUri.replace(/\/\/(.*):(.*)@/, '//$1:****@');
    console.log('📡 Attempting to connect to:', redactedUri);

    mongoose.connect(mongoUri)
        .then(() => console.log('✅ MongoDB Connected'))
        .catch(err => {
            console.error('❌ MongoDB Connection Error:', err.message);
        });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

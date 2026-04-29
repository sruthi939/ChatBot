const express = require('express');
const { OpenAI } = require('openai');
const Message = require('../models/Message');
const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Send message & Get AI response
router.post('/send', async (req, res) => {
    try {
        const { userId, text } = req.body;

        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key') {
            return res.status(500).json({ error: 'OpenAI API Key is missing. Please add it to the backend .env file.' });
        }

        // Save user message
        const userMsg = new Message({ user: userId, text, sender: 'user' });
        await userMsg.save();

        // Get AI response
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful and sleek AI assistant for a premium chat app. Keep your responses concise, professional, and friendly." },
                { role: "user", content: text }
            ],
        });

        const botText = completion.choices[0].message.content;

        // Save bot response
        const botMsg = new Message({ user: userId, text: botText, sender: 'bot' });
        await botMsg.save();

        res.json({ userMsg, botMsg });
    } catch (err) {
        console.error('AI_ERROR:', err);
        res.status(500).json({ error: 'AI processing failed. Check your API key or network connection.' });
    }
});

// Get chat history
router.get('/history/:userId', async (req, res) => {
    try {
        const messages = await Message.find({ user: req.params.userId }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

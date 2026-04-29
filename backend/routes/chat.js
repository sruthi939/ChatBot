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
        const { userId, text, persona } = req.body;

        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key') {
            return res.status(500).json({ error: 'OpenAI API Key is missing. Please add it to the backend .env file.' });
        }

        // Persona System Prompts
        const systemPrompts = {
            Architect: "You are The Architect. You are an expert at coding, system design, and debugging. Your responses should be technical, precise, and include code examples where helpful.",
            Creative: "You are The Creative. You are an expert at writing stories, emails, and marketing copy. Your responses should be imaginative, expressive, and engaging.",
            Analyst: "You are The Analyst. You are an expert at data, math, and logical reasoning. Your responses should be data-driven, logical, and structured with bullet points.",
            Coach: "You are The Coach. You are friendly, motivating, and focused on personal growth. Your responses should be encouraging, empathetic, and action-oriented."
        };

        const systemPrompt = systemPrompts[persona] || "You are a helpful AI assistant. Keep responses concise and professional.";

        // Save user message
        const userMsg = new Message({ user: userId, text, sender: 'user' });
        await userMsg.save();

        // Get AI response
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: text }
            ],
        });

        const botText = completion.choices[0].message.content;
        const totalTokens = completion.usage.total_tokens;

        // Save bot response with token count
        const botMsg = new Message({
            user: userId,
            text: botText,
            sender: 'bot',
            tokens: totalTokens
        });
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

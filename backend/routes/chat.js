const express = require('express');
const { OpenAI } = require('openai');
const Message = require('../models/Message');
const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'sk-missing-key-please-check-env',
});

// Send message & Get AI response
router.post('/send', async (req, res) => {
    try {
        const { userId, text, persona } = req.body;

        // Failsafe check for API Key
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your_openai_api_key')) {
            return res.status(500).json({ error: 'AI_AUTH_FAILED: OpenAI API Key is missing or invalid in .env' });
        }

        // Failsafe check for Database
        const mongoose = require('mongoose');
        if (mongoose.connection.readyState !== 1) {
            return res.status(500).json({ error: 'DB_CONNECTION_FAILED: Cannot save messages to MongoDB' });
        }

        // Persona System Prompts
        const systemPrompts = {
            Architect: "You are The Architect. Expert at coding and system design.",
            Creative: "You are The Creative. Expert at imaginative writing.",
            Analyst: "You are The Analyst. Expert at data and logic.",
            Coach: "You are The Coach. Focus on growth and empathy."
        };

        const systemPrompt = systemPrompts[persona] || "You are a helpful AI assistant.";

        // 1. Save user message first
        const userMsg = new Message({ user: userId, text, sender: 'user' });
        await userMsg.save();

        // 2. Request AI completion
        let completion;
        try {
            completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: text }
                ],
            });
        } catch (aiErr) {
            console.error('OPENAI_API_ERROR:', aiErr.message);
            return res.status(502).json({ error: `AI_ENGINE_ERROR: ${aiErr.message}` });
        }

        const botText = completion.choices[0].message.content;
        const totalTokens = completion.usage.total_tokens;

        // 3. Save bot response
        const botMsg = new Message({
            user: userId,
            text: botText,
            sender: 'bot',
            tokens: totalTokens
        });
        await botMsg.save();

        res.json({ userMsg, botMsg });
    } catch (err) {
        console.error('CRITICAL_CHAT_ERROR:', err);
        res.status(500).json({ error: `SYSTEM_FAILURE: ${err.message}` });
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

// Group Chat (Multiple Personas)
router.post('/group', async (req, res) => {
    try {
        const { userId, text } = req.body;
        const personas = ['Architect', 'Creative', 'Analyst'];
        
        const responses = await Promise.all(personas.map(async (p) => {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: `You are ${p}.` },
                    { role: "user", content: text }
                ],
            });
            return { persona: p, text: completion.choices[0].message.content, tokens: completion.usage.total_tokens };
        }));

        const botMessages = await Promise.all(responses.map(async (r) => {
            const msg = new Message({ user: userId, text: `[${r.persona}] ${r.text}`, sender: 'bot', tokens: r.tokens });
            await msg.save();
            return msg;
        }));

        res.json({ botMessages });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

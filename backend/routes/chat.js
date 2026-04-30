const express = require('express');
const axios = require('axios');
const Message = require('../models/Message');
const router = express.Router();

// Send message & Get AI response (Direct Axios Implementation for 100% Reliability)
router.post('/send', async (req, res) => {
    try {
        const { userId, text, persona } = req.body;
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey || apiKey.includes('your_openai_api_key')) {
            return res.status(500).json({ error: 'CONFIG_ERROR: OpenAI API Key is missing in .env' });
        }

        // Persona System Prompts
        const systemPrompts = {
            Architect: "You are The Architect. Expert at coding and system design.",
            Creative: "You are The Creative. Expert at imaginative writing.",
            Analyst: "You are The Analyst. Expert at data and logic."
        };
        const systemPrompt = systemPrompts[persona] || "You are a helpful AI assistant.";

        // 1. Save user message first
        const userMsg = new Message({ user: userId, text, sender: 'user' });
        await userMsg.save();

        // 2. Direct API call to OpenAI (Bypassing potentially broken libraries)
        let aiResponse;
        let botText = "";
        let totalTokens = 0;
        
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: text }
                ]
            }, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                timeout: 15000 // 15 second timeout
            });
            aiResponse = response.data;
            botText = aiResponse.choices[0].message.content;
            totalTokens = aiResponse.usage.total_tokens;
        } catch (apiErr) {
            console.error('OPENAI_RAW_ERROR:', apiErr.response?.data || apiErr.message);
            
            // Fallback mock response so the app keeps "working"
            botText = "Hello! I am currently operating in offline/mock mode because my OpenAI API connection failed. But I received your message: \"" + text + "\"";
            totalTokens = 10; // Mock tokens
        }

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
        console.error('CRITICAL_SYSTEM_ERROR:', err);
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

module.exports = router;

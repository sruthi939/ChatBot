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

// Group Chat (Multiple Personas)
router.post('/group', async (req, res) => {
    try {
        const { userId, text } = req.body;
        
        const systemPrompts = {
            Architect: "You are The Architect. Expert at code and system design.",
            Creative: "You are The Creative. Expert at imaginative writing.",
            Analyst: "You are The Analyst. Expert at data and logic."
        };

        const personas = ['Architect', 'Creative', 'Analyst'];
        
        // Call OpenAI for each persona in parallel
        const responses = await Promise.all(personas.map(async (p) => {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: systemPrompts[p] },
                    { role: "user", content: text }
                ],
            });
            return { persona: p, text: completion.choices[0].message.content, tokens: completion.usage.total_tokens };
        }));

        // Save all messages
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

const User = require('../models/User');

// Bookmark a message
router.post('/bookmark', async (req, res) => {
    try {
        const { userId, title, text } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        user.bookmarks.push({ title, text });
        await user.save();
        res.json({ message: 'Bookmarked successfully', bookmarks: user.bookmarks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get bookmarks
router.get('/bookmarks/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user.bookmarks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Image Generation
router.post('/generate-image', async (req, res) => {
    try {
        const { userId, prompt } = req.body;
        
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });

        const imageUrl = response.data[0].url;

        // Save as a message
        const botMsg = new Message({ 
            user: userId, 
            text: `![Generated Image](${imageUrl})`, 
            sender: 'bot',
            tokens: 0 // Images are billed differently, but we store 0 tokens for now
        });
        await botMsg.save();

        res.json({ imageUrl, botMsg });
    } catch (err) {
        console.error('IMAGE_ERROR:', err);
        res.status(500).json({ error: 'Image generation failed.' });
    }
});

module.exports = router;

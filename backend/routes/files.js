const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
const router = express.Router();

const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY || 'sk-missing-key-please-check-env' 
});
const upload = multer({ dest: 'uploads/' });

router.post('/analyze', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
        
        const filePath = req.file.path;
        const fileData = fs.readFileSync(filePath);
        
        let text = '';
        if (req.file.mimetype === 'application/pdf') {
            const pdfData = await pdf(fileData);
            text = pdfData.text;
        } else {
            text = fileData.toString();
        }

        // Limit text to 3000 chars for context
        const summarizedText = text.substring(0, 3000);

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a document analyst. Summarize the following document and answer questions about it." },
                { role: "user", content: `Document Content:\n${summarizedText}\n\nUser Question: ${req.body.prompt || "Please summarize this document."}` }
            ],
        });

        // Cleanup file
        fs.unlinkSync(filePath);

        res.json({ 
            analysis: completion.choices[0].message.content,
            fileName: req.file.originalname,
            tokens: completion.usage.total_tokens 
        });
    } catch (err) {
        console.error('FILE_ERROR:', err);
        res.status(500).json({ error: 'File analysis failed' });
    }
});

module.exports = router;

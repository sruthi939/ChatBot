const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    systemPrompt: { type: String, default: "You are a helpful and sleek AI assistant..." },
    apiModel: { type: String, default: "gpt-3.5-turbo" },
    maxTokens: { type: Number, default: 2000 },
    registrationEnabled: { type: Boolean, default: true },
    maintenanceMode: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Config', configSchema);

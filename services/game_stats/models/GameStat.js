const mongoose = require('mongoose');

const GameStatSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    streak: { type: Number, default: 0 },
    lastLoginDate: { type: String }, // YYYY-MM-DD
    energy: { type: Number, default: 0, min: 0, max: 100 }, // Start with 0 energy
    status: { type: String, default: 'idle' }, // idle, walking, sleeping
    walkStartTime: { type: Date }, // Track when walking started
    refillTime: { type: Date }, // When was the last full refill
    hasReward: { type: Boolean, default: false },
    lastEnergyUpdate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('GameStat', GameStatSchema);

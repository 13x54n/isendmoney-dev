const mongoose = require('mongoose');

const RateSchema = new mongoose.Schema({
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    from: { type: String, required: true, default: 'CAD' },
    to: { type: String, required: true, default: 'NPR' },
    rate: { type: Number, required: true },
    provider: { type: String, default: 'system' },
    createdAt: { type: Date, default: Date.now }
});

// Compound index to ensure uniqueness per day per pair
RateSchema.index({ date: 1, from: 1, to: 1 }, { unique: true });

module.exports = mongoose.model('Rate', RateSchema);

const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    recipientName: String,
    recipientId: String, // Optional, if sending to another platform user
    amount: { type: Number, required: true },
    currency: { type: String, default: 'NPR' },
    status: { type: String, default: 'processing' }, // processing, completed, failed
    date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);

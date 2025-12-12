const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Get User Transactions
router.get('/:userId', async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.params.userId }).sort({ date: -1 });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create Transaction
router.post('/', async (req, res) => {
    try {
        const { userId, recipientName, amount, status } = req.body;
        const transaction = new Transaction({
            userId,
            recipientName,
            amount,
            status: status || 'processing'
        });
        await transaction.save();
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

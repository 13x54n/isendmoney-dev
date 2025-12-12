const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Rate = require('./models/Rate');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/isendmoney')
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.send('iSendMoney Backend is running!');
});

// Get Latest Rate
app.get('/api/rate', async (req, res) => {
    try {
        const rate = await Rate.findOne({ from: 'CAD', to: 'NPR' }).sort({ date: -1 });
        if (!rate) return res.status(404).json({ error: 'No rate found' });
        res.json(rate);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Convert Amount
app.get('/api/convert', async (req, res) => {
    try {
        const { amount, from = 'CAD', to = 'NPR' } = req.query;
        if (!amount) return res.status(400).json({ error: 'Amount required' });

        // Currently only supporting CAD -> NPR stored rates
        const rateDoc = await Rate.findOne({ from: 'CAD', to: 'NPR' }).sort({ date: -1 });

        if (!rateDoc) return res.status(404).json({ error: 'Rate unavailable' });

        // Simple logic for supported pairs
        let rate = rateDoc.rate;
        if (from === 'CAD' && to === 'NPR') {
            rate = rateDoc.rate;
        } else if (from === 'NPR' && to === 'CAD') {
            rate = 1 / rateDoc.rate;
        } else {
            return res.status(400).json({ error: `Conversion from ${from} to ${to} not supported yet.` });
        }

        const result = (parseFloat(amount) * rate).toFixed(2);
        res.json({ success: true, from, to, amount: parseFloat(amount), rate, result: parseFloat(result), date: rateDoc.date });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);

    // Start Scheduler
    const { startScheduler } = require('./services/rateScheduler');
    startScheduler();
});

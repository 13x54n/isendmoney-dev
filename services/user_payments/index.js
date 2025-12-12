const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/transactions', require('./routes/transactions'));

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/isendmoney_payments')
    .then(() => console.log('✅ MongoDB connected (Payments)'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => res.send('User & Payment Service Running'));

app.listen(PORT, () => console.log(`🚀 Payment Service running on port ${PORT}`));

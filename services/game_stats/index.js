const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/stats', require('./routes/stats'));

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/isendmoney_gamestats')
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => res.send('Game Stats Service Running'));

app.listen(PORT, () => console.log(`🚀 Game Stats Service running on port ${PORT}`));

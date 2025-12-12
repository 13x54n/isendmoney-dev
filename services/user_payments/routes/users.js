const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create or Update User
router.post('/', async (req, res) => {
    const { userId, email, fullName, phoneNumber } = req.body;
    try {
        let user = await User.findOne({ userId });
        if (user) {
            // Update fields if provided
            if (fullName) user.fullName = fullName;
            if (phoneNumber) user.phoneNumber = phoneNumber;
            if (email) user.email = email;
        } else {
            user = new User({ userId, email, fullName, phoneNumber });
        }
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get User Profile
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add Contact
router.post('/:userId/contacts', async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const { name, initials, phoneNumber, type, bankName, accountNumber, provider } = req.body;
        user.contacts.push({ name, initials, phoneNumber, type, bankName, accountNumber, provider });
        await user.save();
        res.json(user.contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Contacts
router.get('/:userId/contacts', async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user.contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

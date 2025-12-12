const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: String,
    initials: String,
    phoneNumber: String,
    avatar: String,
    type: { type: String, enum: ['bank', 'mobile_money'], default: 'mobile_money' },
    bankName: String,
    accountNumber: String,
    provider: String
});

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Google UID
    email: { type: String, required: true },
    fullName: String,
    phoneNumber: String,
    balance: { type: Number, default: 0 },
    kycStatus: { type: String, default: 'pending' }, // pending, verified, rejected
    contacts: [ContactSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

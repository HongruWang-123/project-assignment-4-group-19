const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    familyName: String,
    givenName: String,
    email: String,
    address: String,
    paymentMethod: String,
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
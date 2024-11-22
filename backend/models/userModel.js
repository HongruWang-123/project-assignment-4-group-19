const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    familyName: String,
    givenName: String,
    email: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;
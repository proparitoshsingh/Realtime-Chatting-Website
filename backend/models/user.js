const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        unique: true
    },
    profilePicture: {
        type: String
    },
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }],
    otp: String,
    otpExpires: Date
});

const User = mongoose.model('User', userSchema);
module.exports = User;
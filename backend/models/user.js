const mongoose = require('mongoose');

const inboxSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    last_message: {
        type: String,
        required: true
    },
    time_of_last_msg: {
        type: String,
        required: true
    },
    profile_picture_link: {
        type: String,
        required: true
    },
    chat_id: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true 
    }
});

const requestSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    last_message: {
        type: String,
        required: true
    },
    time_of_last_msg: {
        type: String,
        required: true
    },
    profile_picture_link: {
        type: String,
        required: true
    },
    chat_id: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true 
    }
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        sparse: true
    },
    googleId: {
        type: String,
    },
    inbox: [inboxSchema],
    requested: [requestSchema],
    otp: String,
    otpExpires: Date
});

userSchema.index({ googleId: 1 }, { unique: true, partialFilterExpression: { googleId: { $exists: true, $ne: null } } });

const User = mongoose.model('User', userSchema);

module.exports = User;

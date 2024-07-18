const { default: mongoose } = require("mongoose");

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
    },
    googleId: {
        type: String,
        unique: true,
    },
    inbox: [
        {
            type: String
        }
    ],
    requested: [
        {
            type: String
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
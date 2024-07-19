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
        sparse: true
    },
    googleId: {
        type: String,
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

userSchema.index({ googleId: 1 }, { unique: true, partialFilterExpression: { googleId: { $exists: true, $ne: null } } });

const User = mongoose.model('User', userSchema);

module.exports = User;
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    isGroup: {
        type: Boolean,
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: function() { return this.isGroup; }
    },
    groupName: { 
        type: String,
        required: function() { return this.isGroup; }
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat; 
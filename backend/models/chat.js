const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    chat_id: {
        type: String,
        required: true,
        unique: true
    },
    isGroup: {
        type: Boolean,
        required: true
    },
    participants: [{
        type: String,
        required: true
    }],
    admin: {
        type: String,
        required: false
    },
    last_msg: {
        type: String,
        required: true
    },
    groupName: {
        type: String,
        required: function() {
            return this.isGroup;
        },
        validate: {
            validator: function(value) {
                if (this.isGroup && !value) {
                    return false;
                }
                return true;
            },
            message: "Group name is required when isGroup is true."
        }
    }
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;

const { default: mongoose } = require("mongoose");

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
    }
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
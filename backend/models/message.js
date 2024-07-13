const { default: mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema({
    message_id: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    chat_id: {
        type: String,
        required: true
    }
});

const Message = mongoose.model("Message", messageSchema);

module.exports=messageSchema;
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Chat = require("../models/chat");

router.get("/chats", async (req, res) => {
    const { username } = req.query;

    const contactNames = [];
    const groupNames = [];
    const requestNames = [];

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const inboxChats = user.inbox || [];
        const requestedChats = user.requested || [];

        const allChatIds = [...inboxChats, ...requestedChats];
        const chats = await Chat.find({ chat_id: { $in: allChatIds } });

        for (const chat of chats) {
            if (inboxChats.includes(chat.chat_id)) {
                if (!chat.isGroup) {
                    const contactUsername = chat.participants.find(participant => participant !== username);
                    const contactUser = await User.findOne({ username: contactUsername });
                    if (contactUser) {
                        contactNames.push(contactUser.name);
                    }
                } else {
                    groupNames.push(chat.groupName);
                }
            } else if (requestedChats.includes(chat.chat_id)) {
                const requestUsername = chat.participants.find(participant => participant !== username);
                const requestUser = await User.findOne({ username: requestUsername });
                if (requestUser) {
                    requestNames.push(requestUser.name);
                }
            }
        }

        res.status(200).json({ group: groupNames, contact: contactNames, request: requestNames });
    } catch (e) {
        console.error(e);
        res.status(502).json({ error: "Database error" });
    }
});

module.exports = router;

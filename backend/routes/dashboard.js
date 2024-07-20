const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Chat = require("../models/chat");

router.get("/chats", async (req, res) => {
    const { username } = req.body;
    const contactNames = [];
    const groupNames = [];
    const requestNames = [];

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }

        const inboxChats = user.inbox;
        const requestedChats = user.requested;

        for (const chatId of inboxChats) {
            const chat = await Chat.findOne({ chat_id: chatId });
            if (!chat) {
                continue;
            }

            if (chat.participants.length === 2) {
                const contactUsername = chat.participants.find(participant => participant !== username);
                console.log(contactUsername);
                const contactUser = await User.findOne({ username: contactUsername });
                console.log(contactUser);
                if (contactUser) {
                    contactNames.push(contactUser.name);
                }
            } else {
                const groupName = "Hello";
                groupNames.push(groupName);
            }
        }

        for (const chatId of requestedChats) {
            const chat = await Chat.findOne({ chat_id: chatId });
            if (!chat) {
                continue;
            }
            const requestUsername = chat.participants.find(participant => participant !== username);
            const requestUser = await User.findOne({ username: requestUsername });
            if (requestUser) {
                requestNames.push(requestUser.name);
            }
        }

        res.status(200).json({ group: groupNames, contact: contactNames, request: requestNames });
    } catch (e) {
        res.status(502).json({ error: "Database error" });
    }
});

module.exports = router;

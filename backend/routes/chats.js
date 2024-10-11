const express = require('express');
const router = express.Router();
const Chat = require('../models/chat');
const Message = require('../models/message');
const checkAuthToken = require('../middleware/checkAuthToken');

router.get('/:chatId', checkAuthToken, async (req, res) => {
   const chatId  = req.params.chatId;
   try {
      const chat = await Chat.findById(chatId).populate('participants', 'username name profilePicture').lean();
      if (!chat) {
         return res.status(404).json({ error: 'Chat not found' });
      }
      res.json({
         groupName: chat.groupName,
         participants: chat.participants,
         lastMessage: chat.lastMessage,
      });
   } catch (error) {
      console.error('Error fetching chat details:', error);
      res.status(500).json({ error: 'Server error' });
   }
});


router.get('/:chatId/messages', async (req, res) => {
   const  chatId  = req.params.chatId;
   const { page = 1 } = req.query;
   const limit = 30;

   try {
      const messages = await Message.find({ chat: chatId })
         .sort({ time: -1 })
         .skip((page - 1) * limit)
         .limit(limit)
         .populate('sender', 'username name');

      res.json(messages.reverse());
   } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve messages' });
   }
});

module.exports = router;

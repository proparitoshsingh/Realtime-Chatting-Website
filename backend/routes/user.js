const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Chat = require('../models/chat');
const checkAuthToken = require('../middleware/checkAuthToken');

router.get('/:username/chats', checkAuthToken, async (req, res) => {
   try {
      const username = req.params.username;
      const user = await User.findOne({ username }).select('_id chats').lean();

      if (!user) {
         return res.status(404).json({ error: 'User not found' });
      }
      const chats = await Chat.find({ participants: user._id }).populate('lastMessage').populate('participants', 'username').lean();
      console.log("chats are send!");
      const finalChats = chats.map(chat => {
         const otherParticipants = chat.participants
            .filter(participant => participant._id.toString() !== user._id.toString())
            .map(participant => participant.username);

         return {
            ...chat,
            otherParticipants
         };
      });

      res.json({ chats: finalChats });
   } catch (error) {
      console.error('Error fetching chats:', error);
      res.status(500).json({ error: 'Server error' });
   }
});

module.exports = router;

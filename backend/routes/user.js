const express = require('express');
const router = express.Router();
const User = require('../models/user');
const checkAuthToken = require('../middleware/checkAuthToken');

router.get('/inbox', checkAuthToken, async (req, res) => {
   try {
      const username = req.query.username;
      const user = await User.findOne({ username: username }).select('inbox').lean();
      if (!user) {
         return res.status(404).json({ error: 'User not found' });
      }
      res.json({ inbox: user.inbox });
   } catch (error) {
      console.error('Error fetching inbox items:', error);
      res.status(500).json({ error: 'Server error' });
   }
});

module.exports = router;

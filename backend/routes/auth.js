const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();

router.post('/signin', passport.authenticate('local', {
   successRedirect: '/dashboard',
   failureRedirect: '/signin',
}));

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
   failureRedirect: '/signin',
   successRedirect: '/dashboard'
}));

router.post('/signup', async (req, res) => {
   const { username, email, password, repassword, name } = req.body;
   if (!username || !email || !password || !repassword || !name) {
      return res.status(400).json({ message: 'Please enter all fields' });
   }
   if (password !== repassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
   }

   try {
      let user = await User.findOne({ $or: [{ username }, { email }] });
      if (user) {
         return res.status(400).json({ message: 'Username or email already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({
         username,
         name,
         email,
         password: hashedPassword
      });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
   }
});
module.exports = router;
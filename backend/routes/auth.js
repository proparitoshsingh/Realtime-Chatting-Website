const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();

router.post('/signin', (req, res, next) => {
   passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(400).json({ message: 'Authentication failed' });
      req.logIn(user, (err) => {
         if (err) return next(err);
         console.log('Auth Successfull for - ',user);
         return res.json({ success: true, message: 'Authenticated successfully' });
      });
   })(req, res, next);
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', (req, res, next) => {
   passport.authenticate('google', (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.redirect('/login?error=Authentication failed');
      req.logIn(user, (err) => {
         if (err) return next(err);
         return res.redirect('http://localhost:5173/dashboard');
      });
   })(req, res, next);
});

router.post('/signup', async (req, res) => {
   const { username, email, password, repassword } = req.body;
   if (!username || !email || !password || !repassword) {
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
         email,
         password: hashedPassword
      });
      await user.save();
      console.log('User registered successfully');
      console.log(user);
      res.status(201).json({ message: 'User registered successfully' });
   } catch (error) {
      console.error('Error during user signup:', error);
      res.status(500).json({ message: 'could not signup' });
   }
});

module.exports = router;
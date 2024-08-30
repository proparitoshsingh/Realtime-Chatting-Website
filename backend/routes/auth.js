const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();
const jwt =require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
   let token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
   return token;
};

router.post('/signin', (req, res, next) => {
   passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(400).json({ message: 'Authentication failed' });
      req.logIn(user, (err) => {
         if (err) return next(err);
         const token = generateToken(user);
         console.log('Auth Successfull for - ', user);
         return res.json({ success: true, message: 'Authenticated successfully', username: user.username, token: token });
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
         const token = generateToken(user);
         return res.redirect(`http://localhost:5173/dashboard?token=${token}`);
      });
   })(req, res, next);
});

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
      console.log('User registered successfully');
      console.log(user);
      res.status(201).json({ message: 'User registered successfully' });
   } catch (error) {
      console.error('Error during user signup:', error);
      res.status(500).json({ message: 'could not signup' });
   }
});

module.exports = router;
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const connectDB = require("./config/db")
const cors = require('cors');
require('dotenv').config();
require('./config/passport');

const app = express();

connectDB();

app.use(express.json());
app.use(session({
   secret: process.env.SESSION_KEY,
   resave: false,
   saveUninitialized: true,
   cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./routes/auth'));

app.get('/dashboard', (req, res) => {
   if (req.isAuthenticated()) {
      res.send(`Welcome ${req.user.username} to the Chat dashboard!`);
   } else {
      res.redirect('/signin');
   }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db');
const checkAuthenticated = require('./middleware/checkAuthenticated');
const cors = require('cors');
require('dotenv').config();
require('./config/passport');

const app = express();

connectDB();

app.use(cors({
   origin: process.env.CLIENT_URL,
   credentials: true,
}));

app.use(express.json());
app.use(session({
   secret: process.env.SESSION_KEY,
   resave: false,
   saveUninitialized: false,
   cookie: { maxAge: 24 * 60 * 60 * 1000 },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./routes/auth'));
app.use('/forget-password', require('./routes/verification'));
app.use('/user', require('./routes/user'));

app.get('/auth/check', (req, res) => {
   if (req.isAuthenticated()) {
      console.log('Request is Authenticated!');
      res.json({ isAuthenticated: true });
   } else {
      console.log('Request is not Authenticated!');
      res.json({ isAuthenticated: false });
   }
});


app.get('/dashboard', checkAuthenticated, (req, res) => {
   res.json({ message: 'welcome to chatter' });
});

app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

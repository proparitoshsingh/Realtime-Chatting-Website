// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

passport.use(new GoogleStrategy({
   clientID: process.env.GOOGLE_CLIENT_ID,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
   callbackURL: "/auth/google/callback"
},
   async (accessToken, refreshToken, profile, done) => {
      try {
         let user = await User.findOne({ googleId: profile.id });
         if (user) {
            return done(null, user);
         }
         user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value
         });
         done(null, user);
      } catch (error) {
         done(error, null);
      }
   }));

passport.use(new LocalStrategy({
   usernameField: 'usernameOrEmail'
},
   async (usernameOrEmail, password, done) => {
      try {
         const user = await User.findOne({
            $or: [
               { username: usernameOrEmail },
               { email: usernameOrEmail }
            ]
         });
         if (!user) {
            return done(null, false, { message: 'Invalid credentials' });
         }
         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
            return done(null, false, { message: 'Wrong password' });
         }
         return done(null, user);
      } catch (error) {
         return done(error);
      }
   }));

passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
   try {
      const user = await User.findById(id);
      done(null, user);
   } catch (error) {
      done(error);
   }
});
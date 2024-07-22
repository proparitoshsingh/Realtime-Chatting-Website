const checkAuthenticated = (req, res, next) => {
   if (req.isAuthenticated()) {
      return next();
   }
   console.log('redirecting to login');
   res.redirect('/login');
};

module.exports = checkAuthenticated;

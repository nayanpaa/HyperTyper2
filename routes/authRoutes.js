const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google', 
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account'
    })
  );

  //passport will now use code given by google
  app.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/home');
    }
  );

  app.get('/api/logout', (req,res) => {
    req.logout();
    res.redirect('/');
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//fetching user model class
const User = mongoose.model('users');

//turn mongoose model instance into a mongo id
passport.serializeUser((user, done) => {
  //this id is not the google user id, this is one from mongo
  done(null, user.id);
});

//turn mongo id into a mongoose model instance
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    }, 
    async (accessToken, refreshToken, profile, done) => {
      //we are asking to find a user that may already exists, this is a query
      //this returns a promise
      const existingUser = await User.findOne({googleId: profile.id});
      if (existingUser) {
        //we already have a record with the given profileID
        //done takes two arguements, an error object and the user
        done(null, existingUser);
       } else {
        // we don't haev a user record with this ID, make a new one.
        // so we have the instance created, then save persists it self to the mongodb database
        // then we get the user from the database and use that in done because its from the database therefore better
        const user = await new User ({googleId: profile.id}).save()
        done(null, user);
       }
    }
  ) 
);
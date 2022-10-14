const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');


passport.use(new googleStrategy({
    clientID: '313923774333-ni0m8ifods35ts1eal40knb7omap71a8.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:1000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.info(profile)
    User.findOne({ email : profile._json.email }, async (err,user) => {
      if(err) {
         return done(err)
      }

      if(user){
        return done(null, user);
      }
      else {
          const googleuser = await User.create({
            firstname : profile._json.family_name,
            lastname : profile._json.given_name,
            password : '123456',
            email : profile._json.email
          })
          console.log('googleuser++',googleuser);
          return done(null, googleuser);
      }
  })
  }
));
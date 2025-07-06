const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name: profile.displayName,
        email: email,
        googleId: profile.id,
      });
      await user.save();
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const passport = require("passport");
const GOOGLE_CLIENT_ID =
  "442836680666-5ojvaini79uu44rdneffm1l8crl4nse5.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const FACEBOOK_CLIENT_ID = "477706624375622";
const FACEBOOK_CLIENT_SECRET = "c0194060e0f43cf3daa62668069b93e9";

const User = require("./models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },

    function (accessToken, refreshToken, profile, done) {
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log("user is: ", currentUser);
        } else {
          new User({
            username: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value,
          })
            .save()
            .then((newUser) => {
              console.log("new user created:" + newUser);
            });
        }
      });
      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

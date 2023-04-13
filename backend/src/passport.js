const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");

const passport = require("passport");
const jwt = require("jsonwebtoken");

/**
Serializes user object for storage in session
@callback serializeUser
@param {Object} user - User object to be serialized
@param {function} done - Callback function to signal completion
@returns {void}
*/
/**
Serializes user object for storage in session
@type {serializeUser}
*/
passport.serializeUser((user, done) => {
  done(null, user);
});

/**
Deserializes user object from session
@callback deserializeUser
@param {Object} user - User object to be deserialized
@param {function} done - Callback function to signal completion
@returns {void}
*/
/**
  Deserializes user object from session
  @type {deserializeUser}
  */
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/facebook/callback`,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      try {
        // Find the user in the database using if the email is existing
        const user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          let displayNameParts = profile.displayName.split(" ");
          let firstName = displayNameParts[0];
          let lastName = displayNameParts[displayNameParts.length - 1];

          const newUser = new User({
            username: profile.emails[0].value,
            email: profile.emails[0].value,
            firstName: firstName,
            lastName: lastName,
            googleOrFbId: profile.id,
            picture: profile.photos?.[0].value,
          });
          await newUser.save();

          const token = jwt.sign(newUser, process.env.SECRET);

          done(null, { token });
        }

        const payload = {
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          googleOrFbId: user.googleOrFbId,
          picture: user.picture,
        };

        const token = jwt.sign(payload, process.env.SECRET);

        done(null, { token });
      } catch (error) {
        done(error);
      }
    }
  )
);

/**
 * Passport middleware configuration for Google authentication
 *
 * @param {string} clientID - Google API client ID
 * @param {string} clientSecret - Google API client secret
 * @param {string} callbackURL - URL to redirect to after authentication
 * @param {function} verify - Verification function to verify user credentials
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      try {
        // Find the user in the database using if the email is existing
        const user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          const newUser = new User({
            username: profile.emails[0].value,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            googleOrFbId: profile.id,
            picture: profile.photos[0].value,
          });
          await newUser.save();

          const token = jwt.sign(newUser, process.env.SECRET);

          done(null, { token });
        }

        const payload = {
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          googleOrFbId: user.googleOrFbId,
          picture: profile.photos[0].value,
        };

        const token = jwt.sign(payload, process.env.SECRET);

        done(null, { token });
      } catch (error) {
        done(error);
      }
    }
  )
);

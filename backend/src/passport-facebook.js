const express = require("express");
const session = require("express-session");
const passport = require("passport");

// start of passport-facebook
const FacebookStrategy = require("passport-facebook").Strategy;

const FACEBOOK_APP_ID = "598419755425063";
const FACEBOOK_APP_SECRET = "075725c2950db8c63669a7964a204ea5";

// Set up passport-facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      // Perform any additional authentication or authorization here,
      // such as checking the user's permissions or storing the user's data.
      // For this example, we will just return the user's profile.
      return cb(null, profile);
    }
  )
);

passport.serializeUser(function (user, cb) {
  // Serialize the user's data to store in the session
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  // Deserialize the user's data to use in the request handler
  cb(null, user);
});

const app = express();

app.use(
  session({
    secret: "075725c2950db8c63669a7964a204ea5",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Set up the routes for the OAuth2 flow
app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // If the authentication is successful, redirect the user to the protected page
    res.redirect("/protected");
  }
);

app.get("/protected", function (req, res) {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // If the user is authenticated, send their data
    res.send(req.user);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
});

// Set up a route for the user to log out
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

// end of passport-facebook

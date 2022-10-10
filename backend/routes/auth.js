const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/authController.js");

const CLIENT_URL = "http://johnmikoresort.store/";

router.get("http://api.johnmikoresort.store/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("http://api.johnmikoresort.store/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("http://api.johnmikoresort.store/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "http://api.johnmikoresort.store/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "http://api.johnmikoresort.store/facebook",
  passport.authenticate("facebook", { scope: ["profile"] })
);

router.get(
  "http://api.johnmikoresort.store/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "http://api.johnmikoresort.store/login/failed",
  })
);

router.post(
  "http://api.johnmikoresort.store/register",
  authController.register
);
router.post("http://api.johnmikoresort.store/login", authController.login);

module.exports = router;

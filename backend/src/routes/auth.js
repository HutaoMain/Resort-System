const router = require("express").Router();
const passport = require("passport");

const authController = require("../controllers/authController");

const CLIENT_URL = process.env.CLIENT_URL;

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user", authController.getUser);

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

// google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    const token = req.user.token;
    res.cookie("jwt_token", token);
    res.redirect(CLIENT_URL);
  }
);

//facebook
router.get("/facebook", passport.authenticate("facebook", { scope: "email" }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    const token = req.user.token;
    res.cookie("jwt_token", token);
    res.redirect(CLIENT_URL);
  }
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.clearCookie("jwt_token");
    res.redirect(CLIENT_URL);
  });
});

module.exports = router;

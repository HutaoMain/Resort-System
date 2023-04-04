const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const authController = require("../controllers/authController");

const CLIENT_URL = process.env.CLIENT_URL;

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user", authController.getUser);

router.get("/login/success", (req, res) => {
  // Verify the JWT
  // const token = req.user?.token;
  // console.log(token);
  // res.cookie("jwt_token", token);
  // if (req.user) {
  //   // User is authenticated, return user details
  //   res.json(req.user);
  // } else {
  //   // User is not authenticated, return error
  //   res.status(401).json({ error: true, message: "User not authenticated" });
  // }
  // Check if the user is authenticated
  // console.log(req.user);
  // if (req.user) {
  //   res.json(req.user);
  // } else {
  //   res.status(401).json({ message: "Unauthorized" });
  // }
  const token = req.cookies.jwt_token;
  // Verify the JWT
  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      res.status(401).send({ error: "Invalid token" });
    } else {
      res.send({ user: decoded }); // Send the decoded payload to the client
    }
  });
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
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: `/login`,
  }),
  async function (req, res) {
    // Successful authentication, redirect home.
    const token = await req.user.token;
    console.log(token);
    res.cookie("jwt_token", token);
  }
);

//facebook
router.get("/facebook", passport.authenticate("facebook", { scope: "email" }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: `/login`,
  })
  // function (req, res) {
  //   // Successful authentication, redirect home.
  //   const token = req.user.token;
  //   console.log(token);
  //   res.cookie("jwt_token", token);
  //   res.redirect(CLIENT_URL);
  // }
);

// router.get("/logout", (req, res) => {
//   req.logout(() => {
//     res.clearCookie("jwt_token");
//     res.redirect(CLIENT_URL);
//   });
// });

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

module.exports = router;

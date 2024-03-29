const User = require("../models/User");
const createError = require("../utils/error");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const reusable = require("../utils/reusable");

const register = async (req, res) => {
  console.log(req.body);
  if (!req.body) {
    throw new Error("Request body is undefined or empty.");
  }

  const { email, password, phoneNumber, firstName, lastName, birthday } =
    req.body;

  if (!email) {
    throw new Error("email field is missing in request body.");
  }

  if (!password) {
    throw new Error("Password field is missing in request body.");
  }

  if (!phoneNumber) {
    throw new Error("phoneNumber field is missing in request body.");
  }

  if (!firstName) {
    throw new Error("firstName field is missing in request body.");
  }

  if (!lastName) {
    throw new Error("lastName field is missing in request body.");
  }

  if (!birthday) {
    throw new Error("birthday field is missing in request body.");
  }

  // Hash the password using bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  // Create a new user account with the hashed password
  const user = new User({
    username: req.body.email,
    email: req.body.email,
    password: hashedPassword,
    confirmPassword: hashedPassword,
    phoneNumber: req.body.phoneNumber,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
  });

  // Save the user to the database
  await user.save(function (err, user) {
    if (err) {
      // If there is an error, send an error message
      res.status(400).send({ message: err });
    } else {
      const token = reusable.generateToken(user);
      reusable.setJwtTokenCookie(res, req, token);
      res.send({ token }); // Send the JWT to the client
    }
  });
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong password or username!"));
    }

    const token = reusable.generateToken(user);
    reusable.setJwtTokenCookie(res, req, token);
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

const getUser = (req, res) => {
  const token = req.cookies.jwt_token;
  // Verify the JWT
  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      res.status(401).send({ error: "Invalid token" });
    } else {
      res.send({ user: decoded }); // Send the decoded payload to the client
    }
  });
};

module.exports = { register, login, getUser };

// const register = async (req, res) => {
//   // Create a new user account and store it in the database
//   await User.create(req.body, function (err, user) {
//     if (err) {
//       // If there is an error, send an error message
//       res.status(400).send({ message: err });
//     } else {
//       // If the user account is created successfully, log the user in and issue an access token
//       req.session.user = user;
//       res.send({ access_token: accessToken });
//     }
//   });
// };

// const getCurrentUser = (req, res) => {
//   const user = req.session.user;
//   res.json({ user });
// };

// const login = async (req, res) => {
//   await User.findOne({ email: req.body.email }, function (err, user) {
//     if (err) {
//       // If there is an error, send an error message
//       res.status(400).send({ message: "Error logging in" });
//     } else if (!user) {
//       // If the user doesn't exist, send an error message
//       res.status(400).send({ message: "Incorrect username or password" });
//     } else if (!user.validPassword(req.body.password)) {
//       // If the password is incorrect, send an error message
//       res.status(400).send({ message: "Incorrect username or password" });
//     } else {
//       // If the login is successful, log the user in and issue an access token
//       req.session.user = user;
//       const refreshToken = jwt.sign({ userId: user._id }, refreshTokenSecret, {
//         expiresIn: "30d", // Expire the refresh token after 30 days
//       });

//       saveRefreshToken(refreshToken);
//       res.send({ access_token: accessToken });
//     }
//   });
// };

// const login = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       return next(createError(404, "User not found!"));
//     } else {
//       // If the login is successful, log the user in and issue an access token
//       // const refreshToken = jwt.sign({ userId: user._id }, refreshTokenSecret, {
//       //   expiresIn: "30d", // Expire the refresh token after 30 days
//       // });
//       // saveRefreshToken(refreshToken);
//       req.session.user = user;
//       res.send({ access_token: accessToken });
//       console.log("successfull login");
//     }
//   } catch (err) {
//     next(err);
//   }
// };

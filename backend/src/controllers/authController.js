const User = require("../models/User");
// const createError = require("../utils/error");
const { v4: uuidv4 } = require("uuid");

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const createGoogle = async (req, res) => {
//   //testing resource access
//   res
//     .status(201)
//     .json({ success: true, result: { id: 123, title: "create google" } });
// };

///

const accessToken = uuidv4();

// const newReservation = new Reserve(req.body);
// try {
//   const savedReservation = await newReservation.save();
//   res.status(200).json(savedReservation);
// } catch (err) {
//   next(err);
// }

// const register = async (req, res, next) => {
//   try {
//     const newUser = new User(req.body);
//     await newUser.save(),
//       function (err, user) {
//         if (err) {
//           // If there is an error, send an error message
//           res.status(400).send({ message: "Error creating user account" });
//         } else {
//           // If the user account is created successfully, log the user in and issue an access token
//           req.session.user = user;
//           res.send({ access_token: accessToken });
//         }
//       };
//   } catch (err) {
//     next(err);
//   }
// };

// const login = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) return next(createError(404, "User not found!"));

//     const isPasswordCorrect = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!isPasswordCorrect)
//       return next(createError(400, "Wrong password or username!"));

//     const token = jwt.sign(
//       { id: user._id, isAdmin: user.isAdmin },
//       process.env.JWT
//     );

//     const { password, isAdmin, ...otherDetails } = user._doc;
//     res
//       .cookie("access_token", token, {
//         httpOnly: true,
//       })
//       .status(200)
//       .json({ details: { ...otherDetails }, isAdmin });
//   } catch (err) {
//     next(err);
//   }
// };

// const express = require("express");
// const session = require("express-session");

// const app = express();

// app.use(
//   session({
//     secret: "resort-system-10202025-secret-key",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

const register = async (req, res) => {
  // Create a new user account and store it in the database
  await User.create(req.body, function (err, user) {
    if (err) {
      // If there is an error, send an error message
      res.status(400).send({ message: err });
    } else {
      // If the user account is created successfully, log the user in and issue an access token
      req.session.user = user;
      res.send({ access_token: accessToken });
    }
  });
};

const login = async (req, res) => {
  await User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      // If there is an error, send an error message
      res.status(400).send({ message: "Error logging in" });
    } else if (!user) {
      // If the user doesn't exist, send an error message
      res.status(400).send({ message: "Incorrect username or password" });
    } else if (!user.validPassword(req.body.password)) {
      // If the password is incorrect, send an error message
      res.status(400).send({ message: "Incorrect username or password" });
    } else {
      // If the login is successful, log the user in and issue an access token
      req.session.user = user;
      res.send({ access_token: "your-access-token" });
    }
  });
};

const getCurrentUser = (req, res) => {
  const user = req.session.user;
  res.json({ user });
};

module.exports = { register, login, getCurrentUser };

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("../utils/error");

// const createGoogle = async (req, res) => {
//   //testing resource access
//   res
//     .status(201)
//     .json({ success: true, result: { id: 123, title: "create google" } });
// };

///

// const newReservation = new Reserve(req.body);
// try {
//   const savedReservation = await newReservation.save();
//   res.status(200).json(savedReservation);
// } catch (err) {
//   next(err);
// }

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };

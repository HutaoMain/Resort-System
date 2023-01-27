const User = require("../models/User");
const createError = require("../utils/error");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  // Hash the password using bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  // Create a new user account with the hashed password
  const user = new User({
    email: req.body.email,
    password: hashedPassword,
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
      const payload = {
        id: user._id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        fullName: user.firstName + user.lastName,
        birthday: user.birthday,
        img: user.img,
      };
      const token = jwt.sign(payload, process.env.SECRET);

      res.send({ token }); // Send the JWT to the client
      console.log(`successfull login JsonToken: ${token}`);
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

    // Login was successful, create a JWT
    const payload = {
      id: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      fullName: user.firstName + user.lastName,
      birthday: user.birthday,
      img: user.img,
    };
    const token = jwt.sign(payload, process.env.SECRET);

    res.send({ token }); // Send the JWT to the client

    console.log(`successfull login JsonToken: ${token}`);
  } catch (err) {
    next(err);
  }
};

const getUser = (req, res) => {
  const token = req.headers.authorization;
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

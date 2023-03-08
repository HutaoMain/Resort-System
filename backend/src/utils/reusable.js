const jwt = require("jsonwebtoken");

const setJwtTokenCookie = (res, req, token) => {
  //TODO add this inside token ,{httpOnly: true, secure: false, // Set to true when deploying over HTTPS}
  res.cookie(`jwt_token`, token);
  console.log("jwt_token cookie:", req.cookies.jwt_token);
};

const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    phoneNumber: user.phoneNumber,
    fullName: user.firstName + " " + user.lastName,
    birthday: user.birthday,
    img: user.img,
  };
  const token = jwt.sign(payload, process.env.SECRET);
  return token;
};

module.exports = { generateToken, setJwtTokenCookie };

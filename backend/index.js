const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const usersRoute = require("./routes/users");
const servicesRoute = require("./routes/services");
const roomsRoute = require("./routes/rooms");
const reservationRoute = require("./routes/reservation");
const authRoute = require("./routes/auth");
const emailRoute = require("./routes/email");
const cookieParser = require("cookie-parser");

const app = express();

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
});

app.use(cors());
app.use(cookieParser());

app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/services", servicesRoute);
app.use("/rooms", roomsRoute);
app.use("/reservations", reservationRoute);
app.use("/email", emailRoute);

// app.post("/send", function (req, res) {
// const transporter = nodemailer.createTransport({
//   host: 'smtp.example.com', // your SMTP host
//   port: 587, // SMTP port
//   secure: false, // use SSL
//   auth: {
//     user: 'username', // your SMTP username
//     pass: 'password' // your SMTP password
//   }
// });

// send a message
// transporter.sendMail({
//   from: 'sender@example.com',
//   to: 'receiver@example.com',
//   subject: 'Nodemailer is easy to use',
//   text: 'This is a test message sent with Nodemailer'
// });

const port = 5000;

app.listen(process.env.PORT || port, () => {
  connect();
  console.log(`Server is running to port ${port}!`);
});

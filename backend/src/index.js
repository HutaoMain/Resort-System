const express = require("express");
const cors = require("cors");
const session = require("express-session");

const dotenv = require("dotenv");
const mongoose = require("mongoose");

const usersRoute = require("./routes/users");
const servicesRoute = require("./routes/services");
const roomsRoute = require("./routes/rooms");
const reservationRoute = require("./routes/reservation");
const authRoute = require("./routes/auth");
const emailRoute = require("./routes/email");

dotenv.config();

const passportSetup = require("./passport");

const passport = require("passport");

const app = express();

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

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

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/services", servicesRoute);
app.use("/rooms", roomsRoute);
app.use("/reservations", reservationRoute);
app.use("/email", emailRoute);

app.use(passport.initialize());
app.use(passport.session());

const port = 5000;

app.listen(process.env.PORT || port, () => {
  connect();
  console.log(`Server is running to port ${port}!`);
});

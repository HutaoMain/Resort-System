const express = require("express");
const cors = require("cors");
const cookieSession = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const usersRoute = require("./routes/users");
const servicesRoute = require("./routes/services");
const roomsRoute = require("./routes/rooms");
const reservationRoute = require("./routes/reservation");
const authRoute = require("./routes/auth");
const emailRoute = require("./routes/email");
const passportSetup = require("./passport");
const passport = require("passport");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cookieSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
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

const port = 5000;

app.listen(process.env.PORT || port, () => {
  connect();
  console.log(`Server is running to port ${port}!`);
});

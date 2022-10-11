const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const servicesRoute = require("./routes/services");
const roomsRoute = require("./routes/rooms");
const reservationRoute = require("./routes/reservation");
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

app.use(
  cookieSession({
    name: "session",
    keys: ["lama"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: [
      "https://johnmikoresort.store/",
      "http://admin.johnmikoresort.store/",
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

//middleware
app.use(cookieParser());

app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/services", servicesRoute);
app.use("/rooms", roomsRoute);
app.use("/reservations", reservationRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json(errorMessage);
});

app.listen("5000", () => {
  connect();
  console.log("Server is running!");
});

const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const usersRoute = require("./routes/users");
const servicesRoute = require("./routes/services");
const roomsRoute = require("./routes/rooms");
const reservationRoute = require("./routes/reservation");
const authRoute = require("./routes/auth");
const emailRoute = require("./routes/email");

const app = express();

app.use(
  session({
    secret: "resort-system-10202025-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

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

const port = 5000;

app.listen(process.env.PORT || port, () => {
  connect();
  console.log(`Server is running to port ${port}!`);
});

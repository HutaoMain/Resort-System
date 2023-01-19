// import express from "express";
// import cors from "cors";

const express = require("express");
const cors = require("cors");

// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
// import session from "express-session";

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// import usersRoute from "./routes/users.js";
// import servicesRoute from "./routes/services.js";
// import roomsRoute from "./routes/rooms.js";
// import reservationRoute from "./routes/reservation.js";
// import authRoute from "./routes/auth.js";
// import emailRoute from "./routes/email.js";

const usersRoute = require("./routes/users");
const servicesRoute = require("./routes/services");
const roomsRoute = require("./routes/rooms");
const reservationRoute = require("./routes/reservation");
const authRoute = require("./routes/auth");
const emailRoute = require("./routes/email");

// import axios from "axios";
// import crypto from "crypto";
// import queryString from "query-string";

const axios = require("axios");
const crypto = require("crypto");

const app = express();
dotenv.config();
app.use(cors("http://localhost:3000"));
app.use(cookieParser());
app.use(express.json());

// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

//facebook

const queryString = require("qs");

const stringifiedParams = queryString.stringify({
  client_id: process.env.FACEBOOK_APP_ID,
  redirect_uri: "https://resort-system.vercel.app/authenticate/facebook",
  scope: ["email"].join(","), // comma seperated string
  response_type: "code",
  auth_type: "rerequest",
  display: "popup",
});

const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;

// const CLIENT_ID = "598419755425063";
// const CLIENT_URI = "http://localhost:3000";

// app.get("/login", (req, res) => {
//   req.session.state = crypto.randomBytes(32).toString("hex");

//   console.log(req.session.state);
//   // Redirect the user to the Facebook authentication endpoint
//   res.redirect(
//     `https://www.facebook.com/v8.0/dialog/oauth?client_id=${CLIENT_ID}&redirect_uri=http://localhost:5000/auth/facebook/callback&state=${req.session.state}&scope=email,public_profile`
//   );
// });

// app.get("/auth/facebook/callback", async (req, res) => {
//   try {
//     req.session.state = crypto.randomBytes(32).toString("hex");
//     // check if req.session and req.query are defined
//     if (!req.session || !req.query) {
//       throw new Error("session or query not defined");
//     }
//     // check if req.query.state and req.session.state are defined
//     if (!req.query.state || !req.session.state) {
//       throw new Error("state not defined");
//     }
//     // Verify the state parameter to prevent CSRF attacks
//     if (req.query.state !== req.session.state) {
//       throw new Error("Invalid state");
//     }
//     // Exchange the authorization code for an access token
//     const { data } = await axios.get(
//       `https://graph.facebook.com/v8.0/oauth/access_token?client_id=${CLIENT_ID}&redirect_uri=http://localhost:5000/auth/facebook/callback&client_secret=YOUR_APP_SECRET&code=${req.query.code}`
//     );
//     // Use the access token to get the user's profile information
//     const { data: profile } = await axios.get(
//       `https://graph.facebook.com/v8.0/me?fields=id,name,email,picture&access_token=${data.access_token}`
//     );
//     // Store the access token and profile information in the session
//     req.session.access_token = data.access_token;
//     req.session.profile = profile;
//     // Send the profile information back to the frontend
//     res.send(profile);
//   } catch (err) {
//     console.log(err);
//   }
// });

//facebook

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

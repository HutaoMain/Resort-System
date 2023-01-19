// import mongoose from "mongoose";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const ReservationSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    rooms: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      default: "Pending",
    },
    roomNumberName: {
      type: String,
    },
    roomNumberId: {
      type: String,
    },
    dateRange: {
      type: Array,
      default: [Date],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", ReservationSchema);

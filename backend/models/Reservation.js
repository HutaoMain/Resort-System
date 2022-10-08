const mongoose = require("mongoose");

const { Schema } = mongoose;

const ReservationSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    service: {
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
    dateRange: {
      type: Array,
      default: [Date],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", ReservationSchema);

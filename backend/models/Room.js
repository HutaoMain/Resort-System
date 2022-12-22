const mongoose = require("mongoose");

const { Schema } = mongoose;

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    picture: {
      type: [String],
    },
    price: {
      type: Number,
    },
    maxPeople: {
      type: String,
    },
    desc: {
      type: String,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);

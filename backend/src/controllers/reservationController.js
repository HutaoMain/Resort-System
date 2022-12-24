const Reserve = require("../models/Reservation");

const createReserve = async (req, res, next) => {
  const newReservation = new Reserve(req.body);
  try {
    const savedReservation = await newReservation.save();
    res.status(200).json(savedReservation);
  } catch (err) {
    next(err);
  }
};

const updateReserve = async (req, res, next) => {
  try {
    const updateReservation = await Reserve.findByIdAndUpdate(
      req.params.id,
      { $set: req.body.status },
      { new: true }
    );
    res.status(200).json(updateReservation);
  } catch (err) {
    next(err);
  }
};

const deleteReserve = async (req, res, next) => {
  try {
    await Reserve.findByIdAndDelete(req.params.id);
    res.status(200).json("The reservation has been deleted.");
  } catch (err) {
    next(err);
  }
};
const getReserve = async (req, res, next) => {
  try {
    const reservation = await Reserve.findById(req.params.id);
    res.status(200).json(reservation);
  } catch (err) {
    next(err);
  }
};

const getReserves = async (req, res, next) => {
  try {
    const reservations = await Reserve.find();
    res.status(200).json(reservations);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createReserve,
  updateReserve,
  deleteReserve,
  getReserve,
  getReserves,
};

// import Room from "../models/Room";

const Room = require("../models/Room");

// const createRoom = async (req, res, next) => {
//   const serviceID = req.params.serviceid;
//   const newRoom = new Room(req.body);

//   try {
//     const savedRoom = await newRoom.save();
//     try {
//       await Service.findByIdAndUpdate(serviceID, {
//         $push: { rooms: savedRoom._id },
//       });
//     } catch (err) {
//       next(err);
//     }
//     res.status(200).json(savedRoom);
//   } catch (err) {
//     next(err);
//   }
// };

const createRoom = async (req, res, next) => {
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

// const updateRoomNumber = async (req, res, next) => {
//   try {
//     const updatedRoomNo = await Room.updateOne(
//       { _id: req.params.id },
//       {
//         $push: {
//           roomNumbers: req.body.sample,
//         },
//       }
//     );
//     res.status(200).json(updatedRoomNo);
//   } catch (err) {
//     next(err);
//   }
// };

// const getRoomByName = async (req, res, next) => {
//   const { title } = req.query;
//   try {
//     const getRoombyId = await (
//       await Room.find({ title: { $in: title } })
//     ).limit(req.query.name);
//     res.status(200).json(getRoombyId);
//   } catch (err) {
//     next(err);
//   }
// };

const pullRoomNumber = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $pull: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been pull.");
  } catch (err) {
    next(err);
  }
};

// {
//   roomNumbers: [
//     {
//       "roomNumbers.$[].number": req.body.roomNo,
//       "roomNumbers.$[].unavailableDates": null,
//     },
//   ],
// },

const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const getRoombyId = await Room.findById(req.params.id);
    res.status(200).json(getRoombyId);
  } catch (err) {
    next(err);
  }
};

const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRoom,
  updateRoom,
  pullRoomNumber,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoomAvailability,
  // getRoomByName,
};

const roomCRUD = require("../controllers/roomController");
const verify = require("../utils/verifyToken");

const router = require("express").Router();

// CREATE
router.post("/:serviceid", roomCRUD.createRoom)

// UPDATE
router.put("/:id", roomCRUD.updateRoom)
router.put("/availability/:id", roomCRUD.updateRoomAvailability)

// DELETE
router.delete("/:id", roomCRUD.deleteRoom)

// GET
router.get("/:id", roomCRUD.getRoom)

// GET ALL
router.get("/", roomCRUD.getRooms)

module.exports = router;
const reservationCRUD = require("../controllers/reservationController");
const verify = require("../utils/verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", reservationCRUD.createReserve)

// UPDATE
router.put("/:id", reservationCRUD.updateReserve)

// DELETE
router.delete("/:id", reservationCRUD.deleteReserve)

// GET
router.get("/:id", reservationCRUD.getReserve)

// GET ALL
router.get("/", reservationCRUD.getReserves)

module.exports = router;
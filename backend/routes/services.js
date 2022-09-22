const serviceCRUD = require("../controllers/servicesController");
const verify = require("../utils/verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", serviceCRUD.createService)

// UPDATE
router.put("/:id", serviceCRUD.updateService)

// DELETE
router.delete("/:id", serviceCRUD.deleteService)

// GET
router.get("/find/:id", serviceCRUD.getService)

// GET ALL
router.get("/", serviceCRUD.getServices)

router.get("/rooms/:id", serviceCRUD.getServiceRoom)

module.exports = router;
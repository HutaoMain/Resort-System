const userRUD = require("../controllers/userController");
const router = require("express").Router();
// const { createGoogle } = require("../controllers/authController");
// const auth = require("./auth");

// router.post("/create", auth, createGoogle);

// router.post("/create", userRUD.createUser);

// UPDATE
router.put("/:id", userRUD.updateUser);

// DELETE
router.delete("/:id", userRUD.deleteUser);

// GET
router.get("/:id", userRUD.getUser);

// GET ALL
router.get("/", userRUD.getUsers);

module.exports = router;

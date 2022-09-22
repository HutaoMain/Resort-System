const userRUD = require("../controllers/userController");
const verify = require("../utils/verifyToken");

const router = require("express").Router();

// router.get("/checkauthentication", verify.verifyToken, (req, res, next) => {
//     res.send("Hello user, you are logged in!");
// })

// router.get("/checkuser/:id", verify.verifyUser, (req, res, next) => {
//     res.send("Hello user, you are logged in!");
// })

// UPDATE
router.put("/:id", userRUD.updateUser)

// DELETE
router.delete("/:id", userRUD.deleteUser)

// GET
router.get("/:id", userRUD.getUser)

// GET ALL
router.get("/", userRUD.getUsers)

module.exports = router;    
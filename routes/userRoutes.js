const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.use(verifyJWT);
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").patch(updateUser).delete(deleteUser);

module.exports = router;

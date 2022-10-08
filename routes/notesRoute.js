const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");

const {
  getAllNotes,
  createNote,
  updateNotes,
  deleteNotes,
} = require("../controllers/noteController");

router.use(verifyJWT);
router.route("/").get(getAllNotes).post(createNote);
router.route("/:id").patch(updateNotes).delete(deleteNotes);

module.exports = router;

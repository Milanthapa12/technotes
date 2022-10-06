const express = require("express");
const router = express.Router();

const {
  getAllNotes,
  createNote,
  updateNotes,
  deleteNotes,
} = require("../controllers/noteController");

router.route("/").get(getAllNotes).post(createNote);
router.route("/:id").patch(updateNotes).delete(deleteNotes);

module.exports = router;

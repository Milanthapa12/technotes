const Note = require("../models/Note");

// get all notes
const getAllNotes = async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 }).exec();
  if (!notes) {
    return res.status(400).json({ message: "Notes not found." });
  }
  res.status(200).json({ notes });
};

// create
const createNote = async (req, res) => {
  const { user, title, description } = req.body;
  const notesObj = {
    user,
    title,
    description,
  };
  const notes = await Note.create({ ...notesObj });
  if (!notes) {
    return res
      .status(400)
      .json({ message: "Note creation failed, please try again" });
  }
  res.status(201).json({ notes });
};

// update
const updateNotes = async (req, res) => {
  const {
    params: { id: id },
    body: { user, title, description },
  } = req;
  const note = await Note.findOneAndUpdate(
    {
      _id: id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!note) {
    return res.status(400).json({ message: "Note not found!" });
  }
  res.status(201).json({ note });
};

// delete
const deleteNotes = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Notes id is required." });
  }
  const notes = await Note.findById(id);
  if (!notes) {
    return res.status(400).json({ message: "Notes not found." });
  }
  const deletedNotes = await notes.delete();
  return res
    .status(200)
    .json({ message: `${deletedNotes.title} note deleted successfully.` });
};

// get notes only user releted
const userAssignedNotes = async (req, res) => {
  const { id } = req.body;
};

module.exports = {
  getAllNotes,
  createNote,
  updateNotes,
  deleteNotes,
  userAssignedNotes,
};

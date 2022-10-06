const User = require("../models/User");
const Note = require("../models/Note");

// const asyncHandler = require("express-async-handler");

const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  if (!users) {
    return res.status(400).json({ message: "No user found !" });
  }
  res.status(200).json({ users });
};

const createUser = async (req, res) => {
  // const { email, username, password, roles } = req.body;
  // if (!Array.isArray(req.body.roles)) {
  //   return res.status(400).json({ error: "Roles are not in array format." });
  // }
  const user = await User.create({ ...req.body });
  res.status(201).json({ username: user.username });
};

const updateUser = async (req, res) => {
  const {
    params: { id: id },
    body: { email, username, roles },
  } = req;
  const user = await User.findOneAndUpdate(
    {
      _id: id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  ).lean();
  if (!username || !email || !roles) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (!user) {
    return res.status(400).json({ error: "User not found." });
  }
  res.status(201).json({ user });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "User id is required." });
  }
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ error: "User not found." });
  }
  const checkUserNotes = await Note.findOne({ user: id }).exec();
  if (checkUserNotes) {
    return res
      .status(400)
      .json({ message: "User cannot be deleted, assigned notes." });
  }
  const deleteUser = await user.delete();
  res.status(200).json({ message: "User deleted successfully." });
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};

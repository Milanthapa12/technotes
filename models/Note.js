const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Invalid user, try to assigned note."],
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Title  field is required."],
    },
    description: {
      type: String,
      required: [true, "Descriptiont field is required."],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

noteSchema.plugin(AutoIncrement, {
  inc_field: "ticket",
  id: "ticketNums",
  start_seq: 1000,
});
module.exports = mongoose.model("Note", noteSchema);

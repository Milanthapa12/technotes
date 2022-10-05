const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: String,
        default: "employee",
      },
    ],
    active: {
      type: Boolean,
      default: true,
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
module.exports = mongoose.model("User", userSchema);

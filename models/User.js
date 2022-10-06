const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email field is required."],
      unique: [true, "Email already exist, try new one."],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email is not valid",
      ],
    },
    username: {
      type: String,
      required: [true, "Username field is required."],
      unique: [true, "Username already exist, try new one."],
      minlength: 2,
      maxlength: 50,
    },
    password: {
      type: String,
      required: [true, "Password field is required."],
      minlength: 8,
      maxlength: 25,
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

// generate password
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
module.exports = mongoose.model("User", userSchema);

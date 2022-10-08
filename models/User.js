const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// create JWT token
userSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      username: this.username,
      email: this.email,
      roles: this.roles,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1m",
    }
  );
};

// refresh token
userSchema.methods.refreshToken = function () {
  return jwt.sign(
    {
      userId: this._id,
      username: this.username,
      email: this.email,
      roles: this.roles,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

// compare password
userSchema.methods.comparePassoword = async function (candidatePassword) {
  const isMatchPass = await bcrypt.compare(candidatePassword, this.password);
  return isMatchPass;
};

module.exports = mongoose.model("User", userSchema);

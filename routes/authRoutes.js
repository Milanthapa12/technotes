const express = require("express");
const router = express.Router();
const loginLimiter = require("../middlewares/loginLimiter");
const { login, refresh, logout } = require("../controllers/authController");
//require('crypto').randomBytes(64).toString('hex); // generate 64 bit hash string, can be used as access token
router.route("/").post(loginLimiter, login);
router.route("/refresh").get(refresh);
router.route("/logout").post(logout);

module.exports = router;

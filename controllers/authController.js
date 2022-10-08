const User = require("../models/User");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and Password fields are required." });
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Invalid credential provided." });
  }
  const isPasswordMatched = await user.comparePassoword(password);
  if (!isPasswordMatched) {
    return res.status(401).json({ message: "Invalid credential provided." });
  }
  const token = user.createJWT();
  // create secure cookie with refresh token
  res.cookie("jwt", user.refreshToken(), {
    httpOnly: true, // accessible onl by web server
    secure: true, // https
    sameSite: "None", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry: set to match rT
  });

  res.json({ accessToken: token });
  //   res.status(200).json({
  //     user: { username: user.username },
  //     token,
  //   });
};

const refresh = (req, res) => {
  const cookie = req.cookies;
  if (!cookie) return res.status(401).json({ message: "Unauthorized" });
  const refreshToken = cookie.jwt;

  // verify user
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      const user = await User.findOne({ username: decoded.username });
      if (!user) return res.status(401).json({ message: "Unauthorized" });
      const accessToken = user.createJWT();
      res.json({ accessToken });
    }
  );
};

const logout = (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(204); //no content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

module.exports = {
  login,
  refresh,
  logout,
};

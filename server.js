require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const corsOptions = require("./config/corsOption");
const connectDB = require("./config/dbConnection");
const mongoose = require("mongoose");
const { logEvent, logEvents } = require("./middlewares/logger");
const PORT = process.env.PORT || 3500;

const { logger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

// db connection
connectDB();
// logger
app.use(logger);
// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// static page
app.use("/", express.static(path.join(__dirname, "public")));

//routes
app.use("/", require("./routes/root"));
app.use("/users", require("./routes/userRoutes"));
app.use("/notes", require("./routes/notesRoute"));

app.use("*", (req, res) => {
  if (req.accepts("html")) {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.status(404).send({ message: "404 page not fund !" });
  } else {
    res.type("txt").send("404 page not found !");
  }
});
app.use(errorHandler);
// server
mongoose.connection.once("open", () => {
  console.log("DB connected successfully.");
  app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});

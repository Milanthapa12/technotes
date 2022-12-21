const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  // origin: (origin, callback) => {
  //   console.log(origin, "before condition");
  //   if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
  //     console.log(origin, "if condition");
  //     callback(null.true);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // },
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
module.exports = corsOptions;

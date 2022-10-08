const rateLimit = require("express-rate-limit");
const { logEvents } = require("./logger");

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 5, // limit each ip to 5 login request/ `window`/ minute
  message: {
    message: "Too many login attempts, please try again after a 60 seconds",
  },
  handler: (req, res, next, options) => {
    logEvents(
      `Too many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "errLog.log"
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true, // return rate limit info in the `rate limit-*` headers
  legacyHeaders: false, // disable the `X-RateLimit-*` headers
});
module.exports = loginLimiter;

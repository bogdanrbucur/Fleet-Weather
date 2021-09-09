// Middleware to handle errors/exceptions
const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.error(err.message);

  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  res.status(500).send("Server side error.");
};

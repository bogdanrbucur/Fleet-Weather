// Module to handle logging and handling exceptions and rejections
const winston = require("winston");
require("express-async-errors"); // module to wrap all express routes in try-catch blocks. Just load and forget

// Can also use winston-mongodb for logging in MongoDB

module.exports = function () {
  // Handle uncaught exceptions (those outside a try-catch block) in the Node process
  process.on("uncaughtException", (ex) => {
    winston.error(ex.message, ex);
    process.exit(1); // anything but 0 means failure
  });

  // Handle unhandled rejections in the Node process (failed promises)
  process.on("unhandledRejection", (ex) => {
    winston.error(ex.message, ex);
    process.exit(1); // anything but 0 means failure
  });

  winston.add(winston.transports.File, { filename: "logfile.log" });
};

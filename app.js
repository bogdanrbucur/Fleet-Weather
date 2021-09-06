require("express-async-errors"); // module to wrap all express routes in try-catch blocks. Just load and forget
const winston = require("winston");
const express = require("express");
const app = express();
const debug = require("debug")("app:main"); // $env:DEBUG="app:*" / export DEBUG="app:*" to see all debugs
const { port } = require("./config");
const updateShips = require("./startup/updateLoop");
require("./startup/routes")(app);

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

// Call function to continously cycle through all ships in array and update them
updateShips();

// Read PORT from environment
app.listen(port, () => winston.info(`Listening on port ${port}...`));

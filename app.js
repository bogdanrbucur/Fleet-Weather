const express = require("express");
const app = express();
const winston = require("winston");
const { port } = require("./startup/config");

require("./startup/logging")(); // Call the module that handled all logging
require("./startup/routes")(app); // Call the module that houses all routes
if (process.env.NODE_ENV !== "test") require("./startup/updateLoop")(); // Call function to continously cycle through all ships and update them

// Read PORT from environment
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);
module.exports = server;

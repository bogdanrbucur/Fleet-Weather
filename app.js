const express = require("express");
const app = express();
const winston = require("winston");
const { port } = require("./startup/config");

require("./startup/logging"); // Call the module that handled all logging
require("./startup/routes")(app); // Call the module that houses all routes

// Call function to continously cycle through all ships in array and update them
require("./startup/updateLoop")();

// Read PORT from environment
app.listen(port, () => winston.info(`Listening on port ${port}...`));

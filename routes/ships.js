// Router module for /api/ships

const express = require("express");
const router = express.Router();
const { getShips } = require("../mongodb/ships");
const debug = require("debug")("app:router-ships");
const { parseIP } = require("../parse"); // Import parseIP function from parse module

// Get all ships - async because await is used
router.get("/", async (req, res) => {
  // Get remote client IP
  let ip = parseIP(req.ip);
  debug(`Remote client ${ip} requested update.`);

  // Get ships from MongoDB. Must wrap in an async in order to use await
  let ships = await getShips(); // Get ships from database
  debug("Sent updated ships from database to remote client.");

  res.status(200).send(ships); // send the ships to the client
});

module.exports = router;

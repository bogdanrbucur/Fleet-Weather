// Router module for /api/ships

const express = require("express");
const router = express.Router();
const { getShips, createShip } = require("../mongodb/ships");
const debug = require("debug")("app:router-ships");
const { parseIP } = require("../parse"); // Import parseIP function from parse module
const auth = require("../middleware/auth");
const { Ship, validateShip } = require("../models/ship");

// Get all ships - async because await is used
router.get("/", async (req, res) => {
  // Get remote client IP
  let ip = parseIP(req.ip);
  debug(`Remote client ${ip} requested update.`);

  // Get ships from MongoDB. Must wrap in an async in order to use await
  let ships = await getShips(); // Get ships from database
  debug("Sent updated ships from database to remote client.");

  res.send(ships); // send the ships to the client
});

// POST a new ship - auth is executed before the async route handler
router.post("/", auth, async (req, res) => {
  // Get remote client IP
  let ip = parseIP(req.ip);
  debug(
    `Remote client ${ip} attempting to add new ship ${JSON.stringify(
      req.body
    )}.`
  );

  // Validate data from remote client
  const { error } = validateShip(req.body); // Joi validation of client input
  if (error) return res.status(400).send(error.details[0].message); // if validation gives an error, 400 Bad request

  // Check if ship already registered
  let ship = await Ship.findOne({ imo: req.body.imo }); // Find ship in db by IMO number
  if (ship) return res.status(400).send("Ship already registered."); // If there's already a ship with the IMO number, 400 Bad request

  // Create and save to DB a new user and return it
  ship = await createShip(req.body);

  // Return it to the client
  res.send(ship.name, ship.imo); // Send the user jwt token in the header and the name and email in body
});

module.exports = router;

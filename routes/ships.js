// Router module for /api/ships

const express = require("express");
const router = express.Router();
const { getShips } = require("../mongodb/ships");
const debug = require("debug")("app:router-ships");
const { parseIP } = require("../parse"); // Import parseIP function from parse module
const auth = require ("../middleware/auth");

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
  // const { error } = validateUser(req.body); // Joi validation of client input
  // if (error) return res.status(400).send(error.details[0].message); // if validation gives an error, 400 Bad request

  // Check if ship already registered
  // let user = await User.findOne({ email: req.body.email }); // Find user in db by email
  // if (user) return res.status(400).send("User already registered."); // If there's already a user with the email, 400 Bad request

  // Create and save to DB a new user and return it
  // user = await createUser(req.body);

  // Return it to the client
  // const token = user.generateAuthToken(); // Generate jwt token
  // res.header("x-auth-token", token).send(_.pick(user, ["name", "email"])); // Send the user jwt token in the header and the name and email in body
  debug(`Remote client ${ip} added new ship to database:`, user.name, user.email);
});

module.exports = router;

// Router module for /users

const express = require("express");
const router = express.Router();
// const { getShips } = require("../mongodb/ships");
const debug = require("debug")("app:router-users");
const { parseIP } = require("../parse"); // Import parseIP function from parse module
const {User, validateUser} = require("../models/user");

// POST a new user - async because await is used
router.post("/", async (req, res) => {
  // Get remote client IP
  let ip = parseIP(req.ip);
  debug(`Remote client ${ip} adding new user ${req.body}.`);

  // Validate data from remote client
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message); // 400 Bad request

  // Check if email already registered
  let user = User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered."); // 400 Bad request

  // Create a new user
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  // Save it to MongoDB
  await user.save();

  // Return it to the client
  res.status(200).send(user); // 200 Ok
  debug(`Remote client ${ip} added new user ${user} to database.`);
});

module.exports = router;

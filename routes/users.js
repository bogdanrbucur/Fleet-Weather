// Router module for /api/users

const _ = require("lodash");
const express = require("express");
const router = express.Router();
const debug = require("debug")("app:router-users");
const { parseIP } = require("../parse"); // Import parseIP function from parse module
const { User, validateUser } = require("../models/user");
const { createUser } = require("../mongodb/users");

// POST a new user - async because await is used
router.post("/", async (req, res) => {
  // Get remote client IP
  let ip = parseIP(req.ip);
  debug(
    `Remote client ${ip} attempting to add new user ${JSON.stringify(
      req.body
    )}.`
  );

  // Validate data from remote client
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message); // 400 Bad request

  // Check if email already registered
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered."); // 400 Bad request

  // Create and save to DB a new user
  user = await createUser(req.body);

  // Return it to the client
  res.send(_.pick(user, ["name", "email"])); // 200 Ok
  debug(`Remote client ${ip} added new user to database:`, user.name, user.email);
});

module.exports = router;

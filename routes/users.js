// Router module for /api/users

const winston = require("winston");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const debug = require("debug")("app:router-users");
const { parseIP } = require("../parse"); // Import parseIP function from parse module
const { User, validateUser } = require("../models/user");
const { createUser, deleteUser } = require("../mongodb/users");
const auth = require("../middleware/auth");
const privilege = require("../middleware/modifyUsers");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// POST a new user - async because await is used
router.post("/", async (req, res) => {
  // Get remote client IP
  let ip = parseIP(req.ip);
  winston.info(
    `Remote client ${ip} attempting to add new user ${JSON.stringify(
      req.body
    )}.`
  );

  // Validate data from remote client
  const { error } = validateUser(req.body); // Joi validation of client input
  if (error) return res.status(400).send(error.details[0].message); // if validation gives an error, 400 Bad request

  // Check if email already registered
  let user = await User.findOne({ email: req.body.email }); // Find user in db by email
  if (user) return res.status(400).send("User already registered."); // If there's already a user with the email, 400 Bad request

  // Create and save to DB a new user and return it
  user = await createUser(req.body);

  // Return it to the client
  const token = user.generateAuthToken(); // Generate jwt token
  res.header("x-auth-token", token).send(_.pick(user, ["name", "email"])); // Send the user jwt token in a custom header and the name and email in body
  winston.warn(
    `Remote client ${ip} added new user to database:`,
    user.name,
    user.email
  );
});

// DELETE a user - auth and privilege middleware are run before async route handler
router.delete("/:id", [auth, privilege], async (req, res) => {
  let user = await deleteUser(req.params.id);

  if (!user) return res.status(404).send("Requested user not found.");

  res.send(_.pick(user, ["name", "email"]));
});

module.exports = router;

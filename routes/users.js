// Router module for /api/users

const _ = require("lodash");
const express = require("express");
const router = express.Router();
const debug = require("debug")("app:router-users");
const { parseIP } = require("../parse"); // Import parseIP function from parse module
const { User, validateUser } = require("../models/user");
const { createUser } = require("../mongodb/users");
const auth = ("../middleware/auth");

// router.get("/me", auth, async (req, res) => {
//   const user = await User.findById(req.user._id).select("-password");
//   res.send(user);
// });

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
  debug(`Remote client ${ip} added new user to database:`, user.name, user.email);
});

module.exports = router;

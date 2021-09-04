// Router module for /api/auth

const express = require("express");
const router = express.Router();
const debug = require("debug")("app:router-users");
const { parseIP } = require("../parse"); // Import parseIP function from parse module
const { User } = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");

// POST a new user - async because await is used
router.post("/", async (req, res) => {
  // Get remote client IP
  let ip = parseIP(req.ip);
  debug(
    `Remote client ${ip} attempting to login with email ${JSON.stringify(
      req.body.email
    )}.`
  );

  // Validate data from remote client
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message); // 400 Bad request

  // Check if email already registered
  let user = await User.findOne({ email: req.body.email }); // If the email is not in the db
  if (!user) return res.status(400).send("Invalid email or password."); // 400 Bad request

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password."); // 400 Bad request

  res.send(true);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(req);
}

module.exports = router;

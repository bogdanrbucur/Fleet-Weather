// Module for interfacing with MongoDB via Mongoose and updating the users in db

const debug = require("debug")("app:db-users"); // $env:DEBUG="app:*" / export DEBUG="app:*" to see all debugs
const { User } = require("../models/user"); // Get the Mongoose user model

async function createUser(body) {
  let user = new User({
    name: body.name,
    email: body.email,
    password: body.password,
  });
  try {
   return await user.save();
  } catch (err) {
    debug(err.message);
  }
}

module.exports.createUser = createUser;

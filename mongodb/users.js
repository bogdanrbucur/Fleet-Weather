// Module for interfacing with MongoDB via Mongoose and updating the users in db

const winston = require("winston");
const debug = require("debug")("app:db-users"); // $env:DEBUG="app:*" / export DEBUG="app:*" to see all debugs
const { User } = require("../models/user"); // Get the Mongoose user model
const hashPassword = require("../hash");

async function createUser(body) {
  let user = new User({
    name: body.name,
    email: body.email,
    password: await hashPassword(body.password),
  });
  try {
   return await user.save();
  } catch (err) {
    winston.error(err.message);
  }
}

async function deleteUser(id) {
  try {
    const result = await User.findByIdAndRemove({ _id: id });
    if(result) winston.warn("DELETED user:", result.email);
    return result;
  } catch (err) {
    winston.error(err.message);
  }
}

module.exports.createUser = createUser;
module.exports.deleteUser = deleteUser;

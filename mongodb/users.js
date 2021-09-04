// Module for interfacing with MongoDB via Mongoose and updating the users in db

const debug = require("debug")("app:db-users"); // $env:DEBUG="app:*" / export DEBUG="app:*" to see all debugs
const { User } = require("../models/user"); // Get the Mongoose user model

async function createUser(body) {
  return new User({
    name: body.name,
    email: body.email,
    password: body.password,
  });
}

module.exports.createUser = createUser;

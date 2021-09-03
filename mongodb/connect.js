// Module for connecting to MongoDB via Mongoose to be reused by different db modules

const mongoose = require("mongoose");
const { dbURL } = require("../config");
const debug = require("debug")("app:db-connect"); // $env:DEBUG="app:*" / export DEBUG="app:*" to see all debugs

mongoose
  .connect(dbURL)
  .then(() => debug("Connected to MongoDB"))
  .catch((err) => debug("Could not connect to MongoDB", err));

module.exports = mongoose;
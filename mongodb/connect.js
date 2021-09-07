// Module for connecting to MongoDB via Mongoose to be reused by different db modules

const winston = require("winston");
const mongoose = require("mongoose");
const { dbURL } = require("../startup/config");
const debug = require("debug")("app:db-connect"); // $env:DEBUG="app:*" / export DEBUG="app:*" to see all debugs

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }) // launch options to get rid of depreciation warnings
  .then(() => winston.info(`Connected to ${dbURL}...`));
mongoose.set("useCreateIndex", true); // To get rid of a depreciation warning
// .catch is handled on process level in Node

module.exports = mongoose;

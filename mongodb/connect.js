// Module for connecting to MongoDB via Mongoose to be reused by different db modules

const winston = require("winston");
const mongoose = require("mongoose");
const { dbURL } = require("../startup/config");
const debug = require("debug")("app:db-connect"); // $env:DEBUG="app:*" / export DEBUG="app:*" to see all debugs

mongoose.connect(dbURL).then(() => winston.info(`Connected to ${dbURL}...`));
// .catch is handled on process level in Node

module.exports = mongoose;

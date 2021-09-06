// Module to house all app related routes and settings

const express = require("express");
const home = require("../routes/home");
const ships = require("../routes/ships");
const users = require("../routes/users");
const auth = require("../routes/auth");
const cors = require("cors");
const error = require("../middleware/error");

module.exports = function (app) {
  app.set("view engine", "pug"); // Express loads pug
  app.set("views", "../views"); // Set views path

  app.enabled("trust proxy"); // To be able to use req.ip from Express

  app.use(cors()); // enable CORS for all routes
  app.use(express.json()); // Used to parse JSON bodies
  // app.use(express.urlencoded()); // Parse URL-encoded bodies
  app.use("/", home); // for home page, use home router
  app.use("/api/ships", ships); // ships route
  app.use("/api/users", users); // users route
  app.use("/api/auth", auth); // users route
  app.options("/api/ships", cors()); // enable pre-flight request for this route
  app.options("/api/users", cors()); // enable pre-flight request for this route

  // Express.js error handling middleware. Runs after route handlers if called with next()
  // err is the argument passed in next(err)
  app.use(error);
};

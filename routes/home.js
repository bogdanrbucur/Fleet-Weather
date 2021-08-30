const express = require("express");
const router = express.Router();
const ships = require("../app");
const debug = require("debug")("app:route");
const { parseIP } = require("../parse"); // Import parseIP function from parse module

router.get("/", (req, res) => {
  // Get remote client IP
  let ip = parseIP(req.ip);
  debug(`Remote client ${ip} connected.`);
  res.render("index", {
    // use to render HTML using a template engine like pug
    title: "Fleet Weather", // used in Pug
    ships: ships.ships, // used to send data in Pug
  });
});

router.get("/api/getships", (req, res) => {
  // Get remote client IP
  let ip = parseIP(req.ip);
  debug(`Remote client ${ip} requested update.`);
  res.status(200).send(ships.ships); // send the ships array to the client
});

module.exports = router;

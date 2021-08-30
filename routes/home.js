const express = require("express");
const router = express.Router();
const ships = require("../app");
const debug = require("debug")("app:route");

router.get("/", (req, res) => {
  let ip = req.hostname;
  debug(`Remote client connected ${ip}`);
  res.render("index", {
    // use to render HTML using a template engine like pug
    title: "Fleet Weather", // used in Pug
    ships: ships.ships, // used to send data in Pug
  });
});

router.get("/api/getships", (req, res) => {
  let ip = req.ips;
  debug(`Remote client ${ip} requested update.`);
  res.status(200).send(ships.ships); // send the ships array to the client
});

module.exports = router;

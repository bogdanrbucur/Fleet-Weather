const express = require("express");
const router = express.Router();
const ships = require("../app");

router.get("/", (req, res) => {
  console.log("Client connected.");
  res.render("index", {
    // use to render HTML using a template engine like pug
    title: "Fleet Weather", // used in Pug
    ships: ships.ships, // used to send data in Pug
  });
});

router.get("/api/getships", (req, res) => {
  console.log("Client requested ships status update.");
  res.status(200).send(ships.ships); // send the ships array to the client
});

module.exports = router;

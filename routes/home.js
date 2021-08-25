const express = require("express");
const router = express.Router();
const ships = require("../app");

router.get("/", (req, res) => {
  console.log("Client connected and received ships status.");
  res.render("index", {
    // use to render HTML using a template engine like pug
    title: "My Express App",
    ships: ships.ships,
  });
});

router.get("/api/getships", (req, res) => {
  console.log("Client requested ships status update.");
  res.status(200).send(ships.ships);
});

module.exports = router;

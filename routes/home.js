const express = require("express");
const router = express.Router();
const ships = require("../app");

router.get("/", (req, res) => {
  console.log("Client connected...");
  res.render("index", {
    // use to render HTML using a template engine like pug
    title: "My Express App",
    ships: ships,
  });
});

module.exports = router;

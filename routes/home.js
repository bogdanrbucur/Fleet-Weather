const express = require("express");
const router = express.Router();
const ships = require("../app");

router.get("/", (req, res) => {
  res.render("index", {
    // use to render HTML using a template engine like pug
    title: "My Express App",
    ships: JSON.stringify(ships),
  });
});

module.exports = router;

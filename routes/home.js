const express = require("express");
const router = express.Router();
const { getShips } = require("../mongodb");
const debug = require("debug")("app:router");
const { parseIP } = require("../parse"); // Import parseIP function from parse module

let ships; // Declared top level so it can be accessed anywhere in the module

// Landing page
router.get("/", (req, res) => {
  // Get remote client IP
  let ip = parseIP(req.ip);
  debug(`Remote client ${ip} connected.`);

  // Get ships from MongoDB. Must wrap in an anonymous async in order to use await
  (async () => {
    ships = await getShips();
    debug("Sent updated ships from database to remote client.");
  })();

  res.render("index", {
    // use to render HTML using a template engine like pug
    title: "Fleet Weather", // used in Pug
    ships: ships, // used to send data in Pug
  });
});

// Update ships API
router.get("/api/getships", (req, res) => {
  // Get remote client IP
  let ip = parseIP(req.ip);
  debug(`Remote client ${ip} requested update.`);

  // Get ships from MongoDB. Must wrap in an anonymous async in order to use await
  (async () => {
    ships = await getShips();
    debug("Sent updated ships from database to remote client.");
  })();

  res.status(200).send(ships); // send the ships to the client
});

module.exports = router;

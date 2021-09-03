// Router module for landing page

const express = require("express");
const router = express.Router();
const debug = require("debug")("app:router_Home");
const { parseIP } = require("../parse"); // Import parseIP function from parse module

// Landing page - used to render the Pug template
router.get("/", (req, res) => {
  // Get remote client IP
  let ip = parseIP(req.ip);
  debug(`Remote client ${ip} connected.`);

  res.render("index", {
    // use to render HTML using a template engine like pug
    title: "Fleet Weather", // used in Pug
    // ships: ships, // used to send data in Pug which is not implemented here because the JS script calls the getships API on document load anyway
  });
});

module.exports = router;

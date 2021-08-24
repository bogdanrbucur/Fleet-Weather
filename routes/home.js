const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    // use to render HTML using a template engine like pug
    title: "My Express App",
    //ships: "Hello world!",
  });
});

module.exports = router;

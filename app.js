const express = require("express");
const home = require("./routes/home");
const app = express();
const Vessel = require("./vessel"); // class Vessel(name, IMO)

app.set("view engine", "pug"); // Express loads pug
app.set("views", "./views"); // default

app.use("/", home); // for home page, use home router

// DEV array to store ships
let ships = [
  new Vessel("Bro Nibe", 9322700),
  new Vessel("Bro Nissum", 9340623),
  new Vessel("Maersk Maru", 9581447),
];

let timeFrameToUpdateAllShips = 1; // minutes within which to update all ships
let interval = (timeFrameToUpdateAllShips / ships.length) * 60 * 1000;

// function to continously update ships in array every interval
function updateShips() {
  let i = 0;
  function updateLoop(i) {
    if (i === ships.length) i = 0;

    ships[i].update();
    i++;

    setTimeout(() => {
      updateLoop(i);
    }, interval);
  }
  updateLoop(i);
}

// Call function to continously cycle through all ships in array and update them
updateShips();

// Read PORT from environment
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports.ships = ships;

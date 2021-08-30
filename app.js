const express = require("express");
const home = require("./routes/home");
const app = express();
const cors = require("cors");
const debug = require("debug")("app:main"); // $env:DEBUG="app:*" / export DEBUG="app:*" to see all debugs
const Vessel = require("./vessel"); // class Vessel(name, IMO)

app.set("view engine", "pug"); // Express loads pug
app.set("views", "./views"); // Set views path

app.enabled("trust proxy"); //

app.use(cors()); // enable CORS for all routes
app.use("/", home); // for home page, use home router
app.use("/api/getships", home); // for home page, use home router
app.options("/api/getships", cors()); // enable pre-flight request for this route

// DEV array to store ships
let ships = [
  new Vessel("Bro Nibe", 9322700),
  new Vessel("Bro Nissum", 9340623),
  new Vessel("Maersk Maru", 9581447),
];

let intervalToUpdateAllShips = 5; // minutes within which to update all ships
let interval = (intervalToUpdateAllShips / ships.length) * 60 * 1000;

// function to continously update ships in array every interval
function updateShips() {
  let i = 0;
  function updateLoop(i) {
    if (i === ships.length) i = 0;
    debug(`Updating ship ${ships[i].name}.`);
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
app.listen(port, () => debug(`Listening on port ${port}...`));

module.exports.ships = ships;

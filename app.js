const express = require("express");
const home = require("./routes/home");
const ships = require("./routes/ships");
const users = require("./routes/users");
const auth = require("./routes/auth");
const app = express();
const cors = require("cors");
const debug = require("debug")("app:main"); // $env:DEBUG="app:*" / export DEBUG="app:*" to see all debugs
const { port } = require("./config");
const { getShips, updateShip } = require("./mongodb/ships");
const quickStats = require("./quick-stats/index");

app.set("view engine", "pug"); // Express loads pug
app.set("views", "./views"); // Set views path

app.enabled("trust proxy"); // To be able to use req.ip from Express

app.use(cors()); // enable CORS for all routes

app.use(express.json()); //Used to parse JSON bodies
// app.use(express.urlencoded()); //Parse URL-encoded bodies

app.use("/", home); // for home page, use home router
app.use("/api/ships", ships); // ships route
app.use("/api/users", users); // users route
app.use("/api/auth", auth); // users route
app.options("/api/ships", cors()); // enable pre-flight request for this route
app.options("/api/users", cors()); // enable pre-flight request for this route

// function to continously update ships in array every interval
async function updateShips() {
  const ships = await getShips(); // Get all ships in DB

  let intervalToUpdateAllShips = 5; // minutes within which to update all ships
  let interval = (intervalToUpdateAllShips / ships.length) * 60 * 1000;

  let i = 0;
  function updateLoop(i) {
    if (i === ships.length) i = 0;
    debug(quickStats()); // App uptime and total memory usage. Pesky memory leaks...
    debug(`Updating ship ${ships[i].name}.`);
    updateShip(ships[i]._id);
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
app.listen(port, () => debug(`Listening on port ${port}...`));

// function to continously update ships in array every interval
const { getShips, updateShip } = require("../mongodb/ships");
const quickStats = require("../quick-stats/index");
const debug = require("debug")("app:updateLoop"); // $env:DEBUG="app:*" / export DEBUG="app:*" to see all debugs
const winston = require("winston");

module.exports = function updateShips() {
  let i = 0;
  async function updateLoop(i) {
    const ships = await getShips(); // Get all ships in DB in every cycle

    let intervalToUpdateAllShips = 10; // minutes within which to update all ships
    let interval = (intervalToUpdateAllShips / ships.length) * 60 * 1000;

    if (i === ships.length) {
      i = 0;
      winston.info(quickStats()); // App uptime and total memory usage. Pesky memory leaks...
    }
    debug(`Updating ship ${ships[i].name}.`);
    updateShip(ships[i]._id);
    i++;

    setTimeout(() => {
      updateLoop(i);
    }, interval);
  }
  updateLoop(i);
};

const Vessel = require("./vessel"); // class Vessel(name, IMO)

// DEV array to store ships
let ships = [
  new Vessel("Bro Nibe", 9322700),
  new Vessel("Bro Nissum", 9340623),
  new Vessel("Maersk Maru", 9581447),
];

// function to continously update ships in array
function updateShips() {
  let i = 0;
  function updateLoop(i) {
    if (i === ships.length) i = 0;

    ships[i].update();
    i++;

    setTimeout(() => {
      updateLoop(i);
    }, 10000);
  }
  updateLoop(i);
}

// Call function to continously cycle through all ships and update them
updateShips();

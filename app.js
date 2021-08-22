const Vessel = require("./vessel"); // class Vessel(name, IMO)

// DEV array to store ships
let ships = [
  new Vessel("Bro Nibe", 9322700),
  new Vessel("Bro Nissum", 9340623),
  new Vessel("Maersk Maru", 9581447),
];

function updateShip(i) {
  if (i < ships.length) {
    ships[i].update();
  } else i = 0;
}

for (let i = 0; i < ships.length; i++) {
  setInterval(() => {
    console.log(i);
    ships[i].update();
  }, 1000);
}

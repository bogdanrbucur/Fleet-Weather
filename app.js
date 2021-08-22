const Vessel = require("./vessel"); // class Vessel(name, IMO)

// DEV array to store ships
let ships = [
  new Vessel("Bro Nibe", 9322700),
  new Vessel("Bro Nissum", 9340623),
  new Vessel("Maersk Maru", 9581447),
];

function main() {
  for (const ship of ships) {
    setTimeout(() => {
      ship.update();
    }, 2000);
  }
}

main();

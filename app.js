const { getArea, getETA } = require("./parse");
const { getCoordinates } = require("./parse");
const { getSpeed } = require("./parse");
const { getDestination } = require("./parse");
const { scrape } = require("./scraper");

let shipName = "Bro Nibe";
let shipIMO = 9322700;

// Function to call on each vessel to get info every 5 min or so
scrape(shipName, shipIMO, (positionText) => {
  // positionText is the text from the VesselFinder page where info about the ship is

  // Make a ship object with the info
  let ship = {
    name: shipName,
    area: getArea(positionText),
    coordinates: getCoordinates(positionText),
    speed: getSpeed(positionText),
    destination: getDestination(positionText),
    eta: getETA(positionText),
  };

  console.log(ship);
});

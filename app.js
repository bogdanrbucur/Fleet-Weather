const {
  getSpeed,
  getCoordinates,
  getArea,
  getDestination,
  getETA,
  getAge,
} = require("./parse");
const { scrape } = require("./scraper");

// Temp variables
let shipName = "Bro Nibe";
let shipIMO = 9322700;

// Function to call on each vessel to get info every 5 min or so
scrape(shipName, shipIMO, (shipInfoText) => {
  // shipInfoText is text from the VesselFinder page where info about the ship is located

  // getWeather(){}

  // Make a ship object with the info
  let ship = {
    name: shipName,
    area: getArea(shipInfoText),
    coordinates: getCoordinates(shipInfoText),
    speed: getSpeed(shipInfoText),
    destination: getDestination(shipInfoText),
    eta: getETA(shipInfoText),
    dataAge: getAge(shipInfoText),
  };
  // Do stuff with the ship object
  console.log(ship);
});

const { getCoordinates } = require("./parse");
const { scrape } = require("./scraper");

let url =
  "https://www.vesselfinder.com/vessels/BRO-NIBE-IMO-9322700-MMSI-220495000";

scrape(url, (positionText) => {
  console.log(positionText);
  console.log(getCoordinates(positionText));
});

// let coordinates = getCoordinates(positionText);

// console.log(positionText);
// console.log(coordinates);

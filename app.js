const { getCoordinates } = require("./parse");
const { scrape } = require("./scraper");

let url =
  "https://www.vesselfinder.com/vessels/BRO-NIBE-IMO-9322700-MMSI-220495000";

async function getPositionText(url) {
  let positionText = await scrape(url);
  console.log(positionText);
  return positionText;
}

getPositionText(url);

// let coordinates = getCoordinates(positionText);

// console.log(positionText);
// console.log(coordinates);

const { getCoordinates } = require("./parse");
const { scrape } = require("./scraper");

let url =
  "https://www.vesselfinder.com/vessels/BRO-NIBE-IMO-9322700-MMSI-220495000";

async function getPositionText(url) {
  async () => {
    let positionText = await scrape(url);
    return positionText;
  };
}

(async () => {
  console.log(await getPositionText(url));
})();

// let coordinates = getCoordinates(positionText);

// console.log(positionText);
// console.log(coordinates);

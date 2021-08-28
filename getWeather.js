// Module to get the weather in ship's position

const puppeteer = require("./getShipInfo");

function getWeather(coordinates, callback) {
  coordArray = coordinates.split("/"); // For using the name in the URL
  lat = coordArray[0];
  long = coordArray[1];

  lat.replace(" ", "");
  long.replace(" ", "");

  // If latitude is N
  if (lat.includes("N")) {
    lat.replace("N", "");
    // If latitude is S
  } else {
    lat.replace("S", "");
    lat = "-" + lat;
  }

  // If longitude is E
  if (long.includes("E")) {
    long.replace("E", "");
    // If longitude is W
  } else {
    long.replace("W", "");
    long = "-" + long;
  }

  const url = `https://www.windy.com/${lat}/${long}/meteogram?${lat},${long},6,i:pressure`;

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Get text where the vessel position is written (div class="text2")
    shipInfoText = await page.$eval(".text2", (el) => el.innerText);
    callback(shipInfoText); // Get the text from the element

    await browser.close();
  })();
}

module.exports = getWeather;

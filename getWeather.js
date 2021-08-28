// Module to get the weather in ship's position

const puppeteer = require("puppeteer");
const debug = require("debug")("app:getWeather");

function getWeather(coordinates, callback) {
  coordArray = coordinates.split("/"); // For using the name in the URL
  lat = coordArray[0];
  long = coordArray[1];

  while (lat.includes(" ")) lat = lat.replace(" ", "");
  while (long.includes(" ")) long = long.replace(" ", "");

  debug(`Lat: ${lat}`);
  debug(`Long: ${long}`);

  // If latitude is N
  if (lat.includes("N")) {
    lat = lat.replace("N", "");
    // If latitude is S
  } else {
    lat = lat.replace("S", "");
    lat = "-" + lat;
  }

  // If longitude is E
  if (long.includes("E")) {
    long = long.replace("E", "");
    // If longitude is W
  } else {
    long = long.replace("W", "");
    long = "-" + long;
  }

  const url = `https://www.windy.com/${lat}/${long}?${lat},${long},6`;
  debug(`Windy URL: ${url}`);

  (async () => {
    const browser = await puppeteer.launch();
    debug(`Puppeteer launch.`);
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );
    await page.goto(url, { waitUntil: "networkidle0" });
    debug(`Opened ${url}`);

    // Get wind at present time
    weather = await page.$eval(
      ".td-gust height-gust d-display-table",
      (el) => el.innerText
    );

    callback(weather); // Get the text from the element

    await browser.close();
    debug(`Closed Chromium.`);
  })();
}

module.exports = getWeather;

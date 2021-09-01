// Module to get the weather in ship's position

const puppeteer = require("puppeteer");
const { coordinatesToURL } = require("./parse"); // Import function from parse
const debug = require("debug")("app:getWeather");

function getWeather(coordinates) {
  // function returns a promise
  return new Promise((resolve, reject) => {
    let url = coordinatesToURL(coordinates);
    debug(`Windy URL: ${url}`);

    (async () => {
      const browser = await puppeteer.launch(); // Chromium on Linux path
      debug(`Puppeteer launch for Windy.`);
      const page = await browser.newPage();
      await page.setUserAgent(
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
      );
      await page.goto(url, { waitUntil: "networkidle0" }); // Wait for the page to fully load
      debug(`Opened ${url}`);

      let weather = await page.evaluate(() => {
        // Get the DOM element that holds the wind gusts data
        let windGustText = document.getElementsByClassName(
          "td-gust height-gust d-display-table"
        );

        let windGusts = windGustText[0].innerText.split("\t"); // Split string by \t (TAB) into all the wind gusts every 3 hours
        return windGusts; // return array with all wind gusts
      });

      resolve(weather); // return wind gusts array

      await browser.close();
      debug(`Closed Windy.`);
    })();
  });
}

module.exports = getWeather;

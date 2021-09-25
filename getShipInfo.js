// Module to scrape Marine Traffic for the ship info

const puppeteer = require("puppeteer");
const debug = require("debug")("app:getShipInfo");
const winston = require("winston");

function getShipInfo(name, imo) {
  // function returns a promise
  return new Promise((resolve, reject) => {
    const url = `https://www.marinetraffic.com/en/ais/details/ships/${imo}`;

    (async () => {
      const browser = await puppeteer.launch(); // Chromium on Raspberry Pi path
      debug(`Puppeteer launch for Marine Traffic.`);
      const page = await browser.newPage();
      await page.setUserAgent(
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
      ); // Pretend it's a real browser
      try {
        await page.goto(url, { waitUntil: "networkidle0" }); // Wait for the page to fully load
        debug(`Opened ${url}`);
      } catch (ex) {
        winston.warn(ex.message);
      }

      // Get text where the vessel information is in the page (id ="vesselDetails_summarySection")
      const shipInfoText = await page.evaluate(() => {
        // Get the DOM element that holds the wind gusts data
        let text = document.getElementsByClassName(
          "MuiGrid-root MuiGrid-container"
        );

        return Object.entries(text); // return array with all wind gusts
        // return text; // return array with all wind gusts
      });

      resolve(shipInfoText); // Get the text from the element
      debug(`Got text from Marine Traffic: ${shipInfoText}`);

      await browser.close();
      debug(`Closed Marine Traffic.`);
    })();
  });
}

module.exports = getShipInfo;

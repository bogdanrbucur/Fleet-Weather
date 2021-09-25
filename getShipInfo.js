// Module to scrape Marine Traffic for the ship info

const puppeteer = require("puppeteer");
const debug = require("debug")("app:getShipInfo");
const winston = require("winston");

const fs = require("fs");

function getShipInfo(name, imo) {
  // function returns a promise
  return new Promise((resolve, reject) => {
    const url = `https://www.marinetraffic.com/en/ais/details/ships/${imo}`;

    (async () => {
      const browser = await puppeteer.launch(); // Chromium on Raspberry Pi path
      debug(`Puppeteer launch for Marine Traffic.`);
      const page = await browser.newPage();
      // await page.setUserAgent(
      //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"
      // ); // Pretend it's a real browser

      await page.setExtraHTTPHeaders({
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
        "upgrade-insecure-requests": "1",
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9,en;q=0.8",
      });

      try {
        await page.goto(url, { waitUntil: "networkidle0" }); // Wait for the page to fully load
        debug(`Opened ${url}`);
      } catch (ex) {
        winston.warn(ex.message);
      }

      await page.waitForSelector("#vesselDetails_summarySection");

      // Get text where the vessel information is in the page (id ="vesselDetails_summarySection")
      shipInfoText = await page.$eval(
        "#vesselDetails_summarySection",
        (el) => el.innerText
      );

      resolve(shipInfoText); // Get the text from the element
      debug(`Got text from Marine Traffic: ${shipInfoText}`);

      await browser.close();
      debug(`Closed Marine Traffic.`);
    })();
  });
}

module.exports = getShipInfo;

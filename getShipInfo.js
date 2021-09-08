// Module to scrape VesselFinder for the ship info

const puppeteer = require("puppeteer");
const debug = require("debug")("app:getShipInfo");

function getShipInfo(name, imo) {
  // function returns a promise
  return new Promise((resolve, reject) => {
    name = name.replace(" ", "-"); // For using the name in the URL
    name = name.toUpperCase(); // For using the name in the URL

    const url = `https://www.vesselfinder.com/vessels/${name}-IMO-${imo}`;

    (async () => {

      const browser = await puppeteer.launch(); // Chromium on Raspberry Pi path
      debug(`Puppeteer launch for VesselFinder.`);
      const page = await browser.newPage();
      await page.setUserAgent(
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
      ); // Pretend it's a real browser
      try {
      await page.goto(url, { waitUntil: "networkidle2" }); // Wait for the page to fully load
      debug(`Opened ${url}`);
      } catch (ex) {
        winston.warn(ex.message);
        continue;
      }

      // Get text where the vessel position is written (div class="text2")
      shipInfoText = await page.$eval(".text2", (el) => el.innerText);
      resolve(shipInfoText); // Get the text from the element
      debug(`Got text from VesselFinder: ${shipInfoText}`);

      await browser.close();
      debug(`Closed VesselFinder.`);
    })();
  });
}

module.exports = getShipInfo;

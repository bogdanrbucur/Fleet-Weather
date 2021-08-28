// Module to scrape VesselFinder for the ship info

const puppeteer = require("puppeteer");

function getShipInfo(name, imo, callback) {
  name.replace(" ", "-"); // For using the name in the URL
  name.toUpperCase(); // For using the name in the URL

  const url = `https://www.vesselfinder.com/vessels/${name}-IMO-${imo}`;

  (async () => {
    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/chromium-browser",
    });
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

module.exports = getShipInfo;
module.exports = puppeteer;

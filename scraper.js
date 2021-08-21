// Module to scrape VesselFinder for the ship info

const puppeteer = require("puppeteer");

function scrape(shipName, shipIMO, callback) {
  shipName.replace(" ", "-"); // For using the name in the URL
  shipName.toUpperCase(); // For using the name in the URL

  const url = `https://www.vesselfinder.com/vessels/${shipName}-IMO-${shipIMO}`;

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Get text where the vessel position is written
    shipInfoText = await page.$eval(".text2", (el) => el.innerText);
    callback(shipInfoText); // Give back the

    // Get the full HTML
    // const data = await page.evaluate(
    //   () => document.querySelector("*").outerHTML
    // );

    await browser.close();
  })();
}

module.exports.scrape = scrape;

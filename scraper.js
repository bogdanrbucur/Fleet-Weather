const puppeteer = require("puppeteer");

function scrape(url, callback) {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Get text where the vessel position is written
    positionText = await page.$eval(".text2", (el) => el.innerText);
    callback(positionText);

    // Get the full HTML
    // const data = await page.evaluate(
    //   () => document.querySelector("*").outerHTML
    // );

    await browser.close();
  })();
}

module.exports.scrape = scrape;

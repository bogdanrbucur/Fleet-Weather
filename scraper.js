const puppeteer = require("puppeteer");

function scrape(url) {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://example.com");

    // Do magic
    const coordinatesText = await page.$eval(
      "body > div > div > main > div > div > p",
      (el) => el.textContent
    );
    console.log(coordinatesText);

    await browser.close();
  })();
}

module.exports.scrape = scrape;

const { getCoorinates } = require("parse");
const puppeteer = require("puppeteer");

function scrape(url) {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Get text where the vessel position is written
    const positionText = await page.$eval(".text2", (el) => el.innerText);

    // Get the full HTML
    // const data = await page.evaluate(
    //   () => document.querySelector("*").outerHTML
    // );

    console.log(positionText);

    await browser.close();
  })();
}

console.log(getCoorinates(positionText));

module.exports.scrape = scrape;
// module.exports.positionText = this.positionText;

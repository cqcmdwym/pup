const puppeteer = require('puppeteer');
const { URL } = require('url');
const fs = require('fs');
const urls = process.argv.slice(2);
const screenshotPath = './screenshots/';

if (!fs.existsSync(screenshotPath)) {
  fs.mkdirSync(screenshotPath);
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  for (let url of urls) {
    try {
      url = new URL(url);
    } catch (error) {
      console.log(error);
      return;
    }
    await page.goto(url.href);
    await page.screenshot({
      path: screenshotPath + url.host + '.png',
      fullPage: true
    });
  }
  await browser.close();
})();

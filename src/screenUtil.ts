import puppeteer from 'puppeteer';

const screenUtil = async () => {
  try {
    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.goto('http://books.toscrape.com/');

    page.setViewport({width: 1400, height: 1080, deviceScaleFactor: 1})

    await page.waitForSelector('.page_inner')
    const titles = await page.$$eval('section .row > li', (liTags: Element[]): string[] => {
      const TextArr = liTags
        .map((a) => a.querySelector('.product_pod > h3 > a')?.textContent) as string[]

      return TextArr;      
    });

    console.log(titles)
    // await page.screenshot({path: 'screenshot.png'});

    browser.close();
  } catch (e) {
    throw e;
  }

};

export default screenUtil;

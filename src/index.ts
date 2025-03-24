import puppeteer from "puppeteer-core";
// Or import puppeteer from 'puppeteer-core';

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", // Replace with your actual path
});
const page = await browser.newPage();

const baseUrl = "https://pitaka.lk/main/";

// Navigate the page to a URL.
await page.goto(baseUrl);

// Set screen size.
await page.setViewport({ width: 1080, height: 1024 });

const doc = await page.locator('li[node-id="1"]');
const parent = await doc.waitHandle();

const pageIds = await parent.evaluate((el) => {
  const pageList = el.querySelectorAll("li[node-id][collections]");
  const pageListIds: Array<string | null> = []
  pageList.forEach((li) => pageListIds.push(li.getAttribute("node-id")));
  return pageListIds;
});



console.log(pageIds);

await browser.close();

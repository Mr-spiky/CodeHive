const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto('https://techfest.org/', { waitUntil: 'networkidle2' });
    
    // Get basic details
    const title = await page.title();
    
    // Check for canvases (WebGL), SVGs, video
    const mediaCounts = await page.evaluate(() => {
      return {
        canvases: document.querySelectorAll('canvas').length,
        videos: document.querySelectorAll('video').length,
        svgs: document.querySelectorAll('svg').length,
        audio: document.querySelectorAll('audio').length,
      };
    });
    
    // Check for preloader classes
    const htmlSnippet = await page.evaluate(() => document.body.innerHTML.substring(0, 500));
    const textContent = await page.evaluate(() => document.body.innerText.substring(0, 500));
    
    console.log("Title:", title);
    console.log("Media counts:", mediaCounts);
    console.log("Body Snippet:", htmlSnippet);
    console.log("Text Snippet:", textContent);
    
    await browser.close();
  } catch (err) {
    console.error("Puppeteer error:", err);
  }
})();

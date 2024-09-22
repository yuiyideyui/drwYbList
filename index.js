const { chromium, firefox, webkit } = require('playwright');

(async () => {
    const browser = await webkit.launch({
        // proxy:{
        //     server:'socks5://127.0.0.1:10808'
        // },
        headless:true
    });  // Or 'firefox' or 'webkit'.
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com/@VPNprochannel/videos');
    const newUrl = await page.evaluate(() => {
        const elements = document.querySelectorAll('ytd-two-column-browse-results-renderer #contents.style-scope.ytd-rich-grid-renderer')
        try {
            if (elements.length > 1) {
                return elements[1].querySelector('#video-title-link').href
            } else {
                return elements[0].querySelector('#video-title-link').href
            }
        } catch (error) {
            return false
        }
    });
    console.log('newUrl',newUrl)
    // other actions...
    await browser.close();
})();
const { By, Key, Builder } = require('selenium-webdriver');
require('chromedriver');

describe('webdriver', () => {
    let driver;
    const app = process.env.APP || 'http://localhost:3000';

    beforeAll(async () => {
        // let builder = new Builder().forBrowser('chrome');
        // builder = builder.setChromeOptions(new chrome.Options().headless());
        // driver = await builder.build();
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(app);
    }, 10000);

    afterAll(async () => {
        await driver.quit();
    }, 15000);

    it('does something', async () => {
        const searchString = 'Automation testing with Selenium and JavaScript';

        await driver
            .findElement(By.name('q'))
            .sendKeys(searchString, Key.RETURN);
        const title = await driver.getTitle();
        expect(title).toEqual(
            'Automation testing with Selenium and JavaScript - Google Search'
        );
    });
});

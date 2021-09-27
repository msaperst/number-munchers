const { Builder } = require('selenium-webdriver');

class Base {
    static getApp() {
        return process.env.APP || 'http://localhost:3000';
    }

    // eslint-disable-next-line class-methods-use-this
    async getDriver() {
        // let builder = new Builder().forBrowser('chrome');
        // builder = builder.setChromeOptions(new chrome.Options().headless());
        // driver = await builder.build();
        const driver = await new Builder().forBrowser('chrome').build();
        await driver.get(Base.getApp());
        return driver;
    }
}

module.exports = new Base();

const { Key } = require('selenium-webdriver');
const Base = require('./common/base');
const Menu = require('./common/menu');
require('chromedriver');

describe('options menu', () => {
    let driver;

    beforeEach(async () => {
        driver = await Base.getDriver();
        const options = await Menu.getOptions(driver);
        await options[3].click();
        await options[3].click();
        const actions = driver.actions();
        await actions.sendKeys(Key.ENTER).perform();
    }, 10000);

    afterEach(async () => {
        await driver.quit();
    }, 15000);

    it('displays correct text', async () => {
        expect(await (await Menu.getTitle(driver)).getText()).toEqual(
            'Select Difficulty'
        );
        expect(await (await Menu.getQuestion(driver)).getText()).toEqual(
            'Current Difficulty: 3rd Grade Advanced\nChoose a level:'
        );
        expect(await (await Menu.getInstructions(driver)).getText()).toEqual(
            'Use Arrows to move, then press Enter.\nEscape: Options Menu'
        );
    });

    it('displays all 11 options', async () => {
        const options = await Menu.getOptions(driver);
        expect(options).toHaveLength(11);
        expect(await options[0].getText()).toEqual('3rd Grade Easy');
        expect(await options[1].getText()).toEqual('3rd Grade Advanced');
        expect(await options[2].getText()).toEqual('4th Grade Easy');
        expect(await options[3].getText()).toEqual('4th Grade Advanced');
        expect(await options[4].getText()).toEqual('5th Grade Easy');
        expect(await options[5].getText()).toEqual('5th Grade Advanced');
        expect(await options[6].getText()).toEqual('6th Grade Easy');
        expect(await options[7].getText()).toEqual('6th Grade Advanced');
        expect(await options[8].getText()).toEqual('7th Grade Easy');
        expect(await options[9].getText()).toEqual('7th Grade Advanced');
        expect(await options[10].getText()).toEqual('8th Grade and Above');
    });

    it('displays 3rd Grade Advanced as selected', async () => {
        const options = await Menu.getOptions(driver);
        expect(await options[1].getAttribute('class')).toEqual('selected');
    });

    it('clicking bottom text returns to options menu', async () => {
        const instructions = await Menu.getInstructions(driver);
        await instructions.click();
        expect(await Menu.onOptionsMenu(driver)).toBeTruthy();
    });

    it('hitting escape returns to options menu', async () => {
        const actions = driver.actions();
        await actions.sendKeys(Key.ESCAPE).perform();
        expect(await Menu.onOptionsMenu(driver)).toBeTruthy();
    });

    it('clicking on 5th Grade Advanced selects 5th Grade Advanced', async () => {
        const options = await Menu.getOptions(driver);
        await options[5].click();
        expect(await options[5].getAttribute('class')).toEqual('selected');
    });

    it('hitting down array selects next option', async () => {
        const actions = driver.actions();
        await actions.sendKeys(Key.ARROW_DOWN).perform();
        const options = await Menu.getOptions(driver);
        expect(await options[2].getAttribute('class')).toEqual('selected');
    });

    it('returns to options when selecting 3rd Grade Easy', async () => {
        const actions = driver.actions();
        await actions.sendKeys(Key.ENTER).perform();
        expect(await Menu.onOptionsMenu(driver)).toBeTruthy();
    });

    it('selects 3rd Grade Easy when selecting 3rd Grade Easy', async () => {
        let actions = driver.actions();
        await actions.sendKeys(Key.ARROW_UP).sendKeys(Key.ENTER).perform();
        actions = driver.actions();
        await actions.sendKeys(Key.ENTER).perform();
        expect(await (await Menu.getQuestion(driver)).getText()).toEqual(
            'Current Difficulty: 3rd Grade Easy\nChoose a level:'
        );
        const options = await Menu.getOptions(driver);
        expect(await options[0].getAttribute('class')).toEqual('selected');
    });

    it('selects 5th Grade Advanced when selecting 5th Grade Advanced', async () => {
        let options = await Menu.getOptions(driver);
        await options[5].click();
        await options[5].click();
        const actions = driver.actions();
        await actions.sendKeys(Key.ENTER).perform();
        expect(await (await Menu.getQuestion(driver)).getText()).toEqual(
            'Current Difficulty: 5th Grade Advanced\nChoose a level:'
        );
        options = await Menu.getOptions(driver);
        expect(await options[5].getAttribute('class')).toEqual('selected');
    });
});

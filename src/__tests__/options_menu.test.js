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
    }, 10000);

    afterEach(async () => {
        await driver.quit();
    }, 15000);

    it('displays correct text', async () => {
        expect(await (await Menu.getTitle(driver)).getText()).toEqual(
            'Options'
        );
        expect(await (await Menu.getQuestion(driver)).getText()).toEqual(
            'Choose an option:'
        );
        expect(await (await Menu.getInstructions(driver)).getText()).toEqual(
            'Use Arrows to move, then press Enter.\nEscape: Main Menu'
        );
    });

    it('displays all 6 options', async () => {
        const options = await Menu.getOptions(driver);
        expect(options).toHaveLength(6);
        expect(await options[0].getText()).toEqual('Set Difficulty Level');
        expect(await options[1].getText()).toEqual('Set Content');
        expect(await options[2].getText()).toEqual('Erase Hall of Fame');
        expect(await options[3].getText()).toEqual('Set Password');
        expect(await options[4].getText()).toEqual('Turn Joystick ON');
        expect(await options[5].getText()).toEqual('Calibrate Joystick');
    });

    it('clicking bottom text returns to main menu', async () => {
        const instructions = await Menu.getInstructions(driver);
        await instructions.click();
        expect(await Menu.onMainMenu(driver)).toBeTruthy();
    });

    it('hitting escape returns to main menu', async () => {
        const actions = driver.actions();
        await actions.sendKeys(Key.ESCAPE).perform();
        expect(await Menu.onMainMenu(driver)).toBeTruthy();
    });

    it('clicking on Set Password selects Set Password', async () => {
        const options = await Menu.getOptions(driver);
        await options[3].click();
        expect(await options[3].getAttribute('class')).toEqual('selected');
    });

    it('hitting down array selects next option', async () => {
        const actions = driver.actions();
        await actions.sendKeys(Key.ARROW_DOWN).perform();
        const options = await Menu.getOptions(driver);
        expect(await options[1].getAttribute('class')).toEqual('selected');
    });

    it('goes to difficulty level when selecting set difficulty level', async () => {
        const actions = driver.actions();
        await actions.sendKeys(Key.ENTER).perform();
        expect(await Menu.onDifficultyLevelMenu(driver)).toBeTruthy();
    });

    it('goes to difficulty level when clicking set difficulty level', async () => {
        const options = await Menu.getOptions(driver);
        await options[0].click();
        expect(await Menu.onDifficultyLevelMenu(driver)).toBeTruthy();
    });
});

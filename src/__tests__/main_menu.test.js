const { Key, By } = require('selenium-webdriver');
const Base = require('./common/base');
const Menu = require('./common/menu');
require('chromedriver');

describe('main menu', () => {
    let driver;

    beforeEach(async () => {
        driver = await Base.getDriver();
    }, 10000);

    afterEach(async () => {
        await driver.quit();
    }, 15000);

    it('displays correct text', async () => {
        expect(
            await driver.findElements(By.className('menu-title'))
        ).toHaveLength(0);
        expect(await (await Menu.getQuestion(driver)).getText()).toEqual('');
        expect(await (await Menu.getInstructions(driver)).getText()).toEqual(
            'Use Arrows to move, then press Enter'
        );
    });

    it('displays all 5 options', async () => {
        const options = await Menu.getOptions(driver);
        expect(options).toHaveLength(5);
        expect(await options[0].getText()).toEqual('Play Number Munchers');
        expect(await options[1].getText()).toEqual('Hall of Fame');
        expect(await options[2].getText()).toEqual('Information');
        expect(await options[3].getText()).toEqual('Options');
        expect(await options[4].getText()).toEqual('Quit');
    });

    it('clicking bottom text does nothing', async () => {
        const instructions = await Menu.getInstructions(driver);
        await instructions.click();
        expect(await Menu.onMainMenu(driver)).toEqual(true);
    });

    it('hitting escape does nothing', async () => {
        const actions = driver.actions();
        await actions.sendKeys(Key.ESCAPE).perform();
        expect(await Menu.onMainMenu(driver)).toEqual(true);
    });

    it('clicking on Options selects options', async () => {
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

    it('goes to game selection when selecting play number munchers', async () => {
        const actions = driver.actions();
        await actions.sendKeys(Key.ENTER).perform();
        expect(await Menu.onPlayNumberMunchersMenu(driver)).toEqual(true);
    });

    it('goes to options when selecting options', async () => {
        const options = await Menu.getOptions(driver);
        await options[3].click();
        await options[3].click();
        expect(await Menu.onOptionsMenu(driver)).toEqual(true);
    });
});

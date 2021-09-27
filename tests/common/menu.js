const { By } = require('selenium-webdriver');

class Menu {
    // eslint-disable-next-line class-methods-use-this
    async getTitle(driver) {
        return driver.findElement(By.className('menu-title'));
    }

    // eslint-disable-next-line class-methods-use-this
    async getQuestion(driver) {
        return (await driver.findElements(By.className('text')))[0];
    }

    // eslint-disable-next-line class-methods-use-this
    async getInstructions(driver) {
        return (await driver.findElements(By.className('text')))[1];
    }

    // eslint-disable-next-line class-methods-use-this
    async getOptions(driver) {
        return driver
            .findElement(By.className('options'))
            .findElements(By.css('li'));
    }

    async onMainMenu(driver) {
        const options = await this.getOptions(driver);
        expect(await options[0].getText()).toEqual('Play Number Munchers');
        return true;
    }

    async onPlayNumberMunchersMenu(driver) {
        const question = await this.getQuestion(driver);
        expect(await question.getText()).toEqual(
            'Which Number Munchers game would you like to play'
        );
        return true;
    }

    async onOptionsMenu(driver) {
        const title = await this.getTitle(driver);
        expect(await title.getText()).toEqual('Options');
        return true;
    }
}
module.exports = new Menu();

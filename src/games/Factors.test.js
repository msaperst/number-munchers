import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Factors from './Factors';

Enzyme.configure({ adapter: new Adapter() });

describe('factors', () => {
    it('ensures resetting the number always gives a new one', () => {
        const factors = new Factors();
        let oldNumber = factors.getNumber();
        for (let x = 0; x < 100; x++) {
            factors.resetNumber();
            expect(factors.getNumber()).not.toEqual(oldNumber);
            oldNumber = factors.getNumber();
        }
    });

    it('returns factors', () => {
        expect(new Factors().getName()).toEqual('Factors');
    });

    it('returns correct screen', () => {
        const wrapper = Enzyme.shallow(new Factors().getScreen());
        expect(wrapper.find('.title').text()).toEqual(
            `Factors of ${wrapper.state().game.getNumber()}`
        );
    });

    it('returns proper title', () => {
        const factors = new Factors();
        expect(factors.getTitle()).toEqual(`Factors of ${factors.getNumber()}`);
    });

    it('returns proper error', () => {
        const factors = new Factors();
        expect(factors.getError(5)).toEqual(
            `"5" is not a factor of "${factors.getNumber()}".`
        );
    });

    it('defaults to return base not lower than 3', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Factors().getNumber()).toBeGreaterThanOrEqual(3);
        }
    });

    it('returns base not lower than provided', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Factors(10).getNumber()).toBeGreaterThanOrEqual(10);
            expect(new Factors(25).getNumber()).toEqual(25);
        }
    });

    it('default to return base not higher than 25', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Factors().getNumber()).toBeLessThanOrEqual(25);
        }
    });

    it('returns base not higher than provided', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Factors(3, 10).getNumber()).toBeLessThanOrEqual(10);
            expect(new Factors(3, 3).getNumber()).toEqual(3);
        }
    });

    it('defaults to return factor nothing lower than 1', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Factors().getFactor()).toBeGreaterThanOrEqual(1);
        }
    });

    it('defaults to return factor nothing greater than number', () => {
        for (let x = 0; x < 100; x++) {
            const factors = new Factors();
            expect(factors.getFactor()).toBeLessThanOrEqual(
                factors.getNumber()
            );
        }
    });

    it('returns a valid factor', () => {
        for (let x = 0; x < 100; x++) {
            const factors = new Factors();
            expect(factors.getNumber() % factors.getFactor()).toEqual(0);
        }
    });

    it('defaults to return non factor nothing lower than 1', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Factors().getNonFactor()).toBeGreaterThanOrEqual(1);
        }
    });

    it('defaults to return non factor nothing greater than number', () => {
        for (let x = 0; x < 100; x++) {
            const factors = new Factors();
            expect(factors.getNonFactor()).toBeLessThanOrEqual(
                factors.getNumber()
            );
        }
    });

    it('returns an invalid factor', () => {
        for (let x = 0; x < 100; x++) {
            const factors = new Factors();
            expect(factors.getNumber() % factors.getNonFactor()).not.toEqual(0);
        }
    });

    it('defaults to return filler nothing lower than 1', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Factors().getFiller()).toBeGreaterThanOrEqual(1);
        }
    });

    it('defaults to return filler nothing greater than number', () => {
        for (let x = 0; x < 100; x++) {
            const factors = new Factors();
            expect(factors.getFiller()).toBeLessThanOrEqual(
                factors.getNumber()
            );
        }
    });

    it('verifies some simple factors', () => {
        const factors = new Factors();
        const number = factors.getNumber();
        const factorNumbers = [...Array(number + 1).keys()].filter(
            (i) => number % i === 0
        );
        factorNumbers.forEach((value) => {
            expect(factors.isCorrect(value)).toEqual(true);
        });
        expect(factors.isCorrect(1)).toEqual(true);
        expect(factors.isCorrect(number)).toEqual(true);
        expect(factors.isCorrect(0)).toEqual(false);
        expect(factors.isCorrect(83)).toEqual(false);
        expect(factors.isCorrect(97)).toEqual(false);
    });
});

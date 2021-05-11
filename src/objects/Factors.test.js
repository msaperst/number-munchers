import Factors from './Factors';

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
        expect(new Factors().getGame()).toEqual('Factors');
    });

    it('defaults to return base not lower than 3', () => {
        const factors = new Factors();
        for (let x = 0; x < 100; x++) {
            expect(factors.getNumber()).toBeGreaterThanOrEqual(3);
        }
    });

    it('default to return base not higher than 25', () => {
        const factors = new Factors();
        for (let x = 0; x < 100; x++) {
            expect(factors.getNumber()).toBeLessThanOrEqual(25);
        }
    });

    it('defaults to return factor nothing lower than 0', () => {
        const factors = new Factors();
        for (let x = 0; x < 100; x++) {
            expect(factors.getFactor()).toBeGreaterThanOrEqual(0);
        }
    });

    it('defaults to return factor nothing greater than number', () => {
        const factors = new Factors();
        for (let x = 0; x < 100; x++) {
            expect(factors.getFactor()).toBeLessThanOrEqual(
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
            expect(factors.isFactor(value)).toEqual(true);
        });
        expect(factors.isFactor(1)).toEqual(true);
        expect(factors.isFactor(number)).toEqual(true);
        expect(factors.isFactor(0)).toEqual(false);
        expect(factors.isFactor(83)).toEqual(false);
        expect(factors.isFactor(97)).toEqual(false);
    });
});

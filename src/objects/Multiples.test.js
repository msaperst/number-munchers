import Multiples from './Multiples';

describe('multiples', () => {
    it('ensures resetting the number always gives a new one', () => {
        const multiples = new Multiples();
        let oldNumber = multiples.getNumber();
        for (let x = 0; x < 100; x++) {
            multiples.resetNumber();
            expect(multiples.getNumber()).not.toEqual(oldNumber);
            oldNumber = multiples.getNumber();
        }
    });

    it('returns multiples', () => {
        expect(new Multiples().getGame()).toEqual('Multiples');
    });

    it('defaults to return base not lower than 2', () => {
        const multiples = new Multiples();
        for (let x = 0; x < 100; x++) {
            expect(multiples.getNumber()).toBeGreaterThanOrEqual(2);
        }
    });

    it('default to return base not higher than 5', () => {
        const multiples = new Multiples();
        for (let x = 0; x < 100; x++) {
            expect(multiples.getNumber()).toBeLessThanOrEqual(5);
        }
    });

    it('defaults to return multiple nothing lower than 0', () => {
        const multiples = new Multiples();
        for (let x = 0; x < 100; x++) {
            expect(multiples.getMultiple()).toBeGreaterThanOrEqual(0);
        }
    });

    it('defaults to return multiple nothing greater than 5x', () => {
        const multiples = new Multiples();
        for (let x = 0; x < 100; x++) {
            expect(multiples.getMultiple()).toBeLessThanOrEqual(25);
        }
    });

    it('verifies some simple factors', () => {
        const multiples = new Multiples();
        const number = multiples.getNumber();
        expect(multiples.isMultiple(number * 5)).toEqual(true);
        expect(multiples.isMultiple(number * 3)).toEqual(true);
        expect(multiples.isMultiple(0)).toEqual(true);
        expect(multiples.isMultiple(83)).toEqual(false);
        expect(multiples.isMultiple(97)).toEqual(false);
    });

    it('defaults to return base not lower than 10', () => {
        const multiples = new Multiples(10, 20);
        for (let x = 0; x < 100; x++) {
            expect(multiples.getNumber()).toBeGreaterThanOrEqual(10);
        }
    });

    it('default to return base not higher than 20', () => {
        const multiples = new Multiples(10, 20);
        for (let x = 0; x < 100; x++) {
            expect(multiples.getNumber()).toBeLessThanOrEqual(20);
        }
    });

    it('defaults to return multiple nothing greater than 20x', () => {
        const multiples = new Multiples(10, 20, 20);
        for (let x = 0; x < 100; x++) {
            expect(multiples.getMultiple()).toBeLessThanOrEqual(400);
        }
    });
});

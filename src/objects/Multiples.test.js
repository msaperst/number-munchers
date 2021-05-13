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

    it('returns proper title', () => {
        const multiples = new Multiples();
        expect(multiples.getTitle()).toEqual(
            `Multiples of ${multiples.getNumber()}`
        );
    });

    it('returns proper error', () => {
        const multiples = new Multiples();
        expect(multiples.getError(5)).toEqual(
            `"5" is not a multiple of "${multiples.getNumber()}".`
        );
    });

    it('defaults to return base not lower than 2', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Multiples().getNumber()).toBeGreaterThanOrEqual(2);
        }
    });

    it('default to return base not higher than 5', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Multiples().getNumber()).toBeLessThanOrEqual(5);
        }
    });

    it('defaults to return multiple nothing lower than 0', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Multiples().getMultiple()).toBeGreaterThanOrEqual(0);
        }
    });

    it('defaults to return multiple nothing greater than 5x', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Multiples().getMultiple()).toBeLessThanOrEqual(25);
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
        for (let x = 0; x < 100; x++) {
            expect(new Multiples(10, 20).getNumber()).toBeGreaterThanOrEqual(
                10
            );
        }
    });

    it('default to return base not higher than 20', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Multiples(10, 20).getNumber()).toBeLessThanOrEqual(20);
        }
    });

    it('defaults to return multiple nothing greater than 20x', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Multiples(10, 20, 20).getMultiple()).toBeLessThanOrEqual(
                400
            );
        }
    });
});

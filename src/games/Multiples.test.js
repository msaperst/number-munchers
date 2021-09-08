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
        expect(new Multiples().getName()).toEqual('Multiples');
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

    it('returns base not lower than provided', () => {
        for (let x = 0; x < 100; x++) {
            let multiples = new Multiples(1);
            expect(multiples.getNumber()).toBeGreaterThanOrEqual(1);
            multiples = new Multiples(10, 20);
            expect(multiples.getNumber()).toBeGreaterThanOrEqual(10);
            multiples = new Multiples(5);
            expect(multiples.getNumber()).toEqual(5);
        }
    });

    it('returns base not higher than provided', () => {
        for (let x = 0; x < 100; x++) {
            let multiples = new Multiples(1, 10);
            expect(multiples.getNumber()).toBeLessThanOrEqual(10);
            multiples = new Multiples(1, 1);
            expect(multiples.getNumber()).toEqual(1);
        }
    });

    it('defaults to return multiple nothing lower than the number', () => {
        for (let x = 0; x < 100; x++) {
            const multiples = new Multiples();
            expect(multiples.getMultiple()).toBeGreaterThanOrEqual(
                multiples.getNumber()
            );
        }
    });

    it('defaults to return multiple nothing greater than 5x', () => {
        for (let x = 0; x < 100; x++) {
            const multiples = new Multiples();
            expect(multiples.getMultiple()).toBeLessThanOrEqual(
                multiples.getNumber() * 5
            );
        }
    });

    it('returns multiple nothing greater than provided', () => {
        for (let x = 0; x < 100; x++) {
            let multiples = new Multiples(2, 7, 10);
            expect(multiples.getMultiple()).toBeLessThanOrEqual(
                multiples.getNumber() * 10
            );
            multiples = new Multiples(2, 7, 1);
            expect(multiples.getMultiple()).toEqual(multiples.getNumber());
        }
    });

    it('returns a correct multiple', () => {
        for (let x = 0; x < 100; x++) {
            const multiples = new Multiples();
            expect(multiples.getMultiple() % multiples.getNumber()).toEqual(0);
        }
    });

    it('defaults to return non multiple nothing lower than 1', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Multiples().getNonMultiple()).toBeGreaterThanOrEqual(1);
        }
    });

    it('defaults to return non multiple nothing greater than 5x', () => {
        for (let x = 0; x < 100; x++) {
            const multiples = new Multiples();
            expect(multiples.getNonMultiple()).toBeLessThanOrEqual(
                multiples.getNumber() * 5
            );
        }
    });

    it('returns non multiple nothing greater than provided', () => {
        for (let x = 0; x < 100; x++) {
            let multiples = new Multiples(2, 7, 10);
            expect(multiples.getNonMultiple()).toBeLessThanOrEqual(
                multiples.getNumber() * 10
            );
            multiples = new Multiples(2, 7, 1);
            expect(multiples.getNonMultiple()).toBeLessThanOrEqual(
                multiples.getNumber()
            );
        }
    });

    it('returns an incorrect multiple', () => {
        for (let x = 0; x < 100; x++) {
            const multiples = new Multiples();
            expect(
                multiples.getNonMultiple() % multiples.getNumber()
            ).not.toEqual(0);
        }
    });

    it('returns filler not less than 1', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Multiples().getFiller()).toBeGreaterThanOrEqual(1);
        }
    });

    it('returns filler nothing greater than 5x', () => {
        for (let x = 0; x < 100; x++) {
            const multiples = new Multiples();
            expect(multiples.getFiller()).toBeLessThanOrEqual(
                multiples.getNumber() * 5
            );
        }
    });

    it('returns filler nothing greater than provided', () => {
        for (let x = 0; x < 100; x++) {
            let multiples = new Multiples(2, 7, 10);
            expect(multiples.getFiller()).toBeLessThanOrEqual(
                multiples.getNumber() * 10
            );
            multiples = new Multiples(2, 7, 1);
            expect(multiples.getFiller()).toBeLessThanOrEqual(
                multiples.getNumber()
            );
        }
    });

    it('verifies some simple factors', () => {
        const multiples = new Multiples();
        const number = multiples.getNumber();
        expect(multiples.isCorrect(number * 5)).toEqual(true);
        expect(multiples.isCorrect(number * 3)).toEqual(true);
        expect(multiples.isCorrect(0)).toEqual(true);
        expect(multiples.isCorrect(83)).toEqual(false);
        expect(multiples.isCorrect(97)).toEqual(false);
    });
});

import Equality from './Equality';

describe('equality', () => {
    it('ensures resetting the number always gives a new one', () => {
        const equality = new Equality();
        let oldNumber = equality.getNumber();
        for (let x = 0; x < 100; x++) {
            equality.resetNumber();
            expect(equality.getNumber()).not.toEqual(oldNumber);
            oldNumber = equality.getNumber();
        }
    });

    it('returns equality', () => {
        expect(new Equality().getGame()).toEqual('Equality');
    });

    it('returns proper title', () => {
        const equality = new Equality();
        expect(equality.getTitle()).toEqual(`Equals ${equality.getNumber()}`);
    });

    it('returns proper error', () => {
        const equality = new Equality();
        expect(equality.getError('5-1')).toEqual('Oops!  "5-1=4"');
    });

    it('defaults to return base not lower than 1', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Equality().getNumber()).toBeGreaterThanOrEqual(1);
        }
    });

    it('default to return base not higher than 20', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Equality().getNumber()).toBeLessThanOrEqual(20);
        }
    });

    it('returns base not lower than provided', () => {
        for (let x = 0; x < 100; x++) {
            let equality = new Equality(5);
            expect(equality.getNumber()).toBeGreaterThanOrEqual(5);
            equality = new Equality(30, 40);
            expect(equality.getNumber()).toBeGreaterThanOrEqual(30);
            equality = new Equality(20);
            expect(equality.getNumber()).toEqual(20);
        }
    });

    it('returns base not higher than provided', () => {
        for (let x = 0; x < 100; x++) {
            let equality = new Equality(1, 10);
            expect(equality.getNumber()).toBeLessThanOrEqual(10);
            equality = new Equality(1, 1);
            expect(equality.getNumber()).toEqual(1);
        }
    });

    it('returns garbage', () => {
        expect(new Equality().getEquality()).toEqual('0undefined0');
    });

    it('defaults to return equality nothing lower than the number', () => {
        for (let x = 0; x < 100; x++) {
            const equality = new Equality();
            expect(equality.getEquality()).toBeGreaterThanOrEqual(
                equality.getNumber()
            );
        }
    });

    it('defaults to return equality nothing greater than 5x', () => {
        for (let x = 0; x < 100; x++) {
            const equality = new Equality();
            expect(equality.getEquality()).toBeLessThanOrEqual(
                equality.getNumber() * 5
            );
        }
    });

    it('returns equality nothing greater than provided', () => {
        for (let x = 0; x < 100; x++) {
            let equality = new Equality(2, 7, 10);
            expect(equality.getEquality()).toBeLessThanOrEqual(
                equality.getNumber() * 10
            );
            equality = new Equality(2, 7, 1);
            expect(equality.getEquality()).toEqual(equality.getNumber());
        }
    });

    it('returns a correct equality', () => {
        for (let x = 0; x < 100; x++) {
            const equality = new Equality();
            expect(equality.getEquality() % equality.getNumber()).toEqual(0);
        }
    });

    it('defaults to return non equality nothing lower than 1', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Equality().getNonEquality()).toBeGreaterThanOrEqual(1);
        }
    });

    it('defaults to return non equality nothing greater than 5x', () => {
        for (let x = 0; x < 100; x++) {
            const equality = new Equality();
            expect(equality.getNonEquality()).toBeLessThanOrEqual(
                equality.getNumber() * 5
            );
        }
    });

    it('returns non equality nothing greater than provided', () => {
        for (let x = 0; x < 100; x++) {
            let equality = new Equality(2, 7, 10);
            expect(equality.getNonEquality()).toBeLessThanOrEqual(
                equality.getNumber() * 10
            );
            equality = new Equality(2, 7, 1);
            expect(equality.getNonEquality()).toBeLessThanOrEqual(
                equality.getNumber()
            );
        }
    });

    it('returns an incorrect equality', () => {
        for (let x = 0; x < 100; x++) {
            const equality = new Equality();
            expect(
                equality.getNonEquality() % equality.getNumber()
            ).not.toEqual(0);
        }
    });

    it('returns filler not less than 1', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Equality().getFiller()).toBeGreaterThanOrEqual(1);
        }
    });

    it('returns filler nothing greater than 5x', () => {
        for (let x = 0; x < 100; x++) {
            const equality = new Equality();
            expect(equality.getFiller()).toBeLessThanOrEqual(
                equality.getNumber() * 5
            );
        }
    });

    it('returns filler nothing greater than provided', () => {
        for (let x = 0; x < 100; x++) {
            let equality = new Equality(2, 7, 10);
            expect(equality.getFiller()).toBeLessThanOrEqual(
                equality.getNumber() * 10
            );
            equality = new Equality(2, 7, 1);
            expect(equality.getFiller()).toBeLessThanOrEqual(
                equality.getNumber()
            );
        }
    });

    it('correctly returns the expected value', () => {
        expect(new Equality().getValue('5-2')).toEqual(3);
        expect(new Equality().getValue('5+2')).toEqual(7);
        expect(new Equality().getValue('5x2')).toEqual(10);
        expect(new Equality().getValue('5÷2')).toEqual(2.5);
    });

    it('verifies some simple values', () => {
        const equality = new Equality();
        const number = equality.getNumber();
        expect(equality.isCorrect(`${number}x1`)).toEqual(true);
        expect(equality.isCorrect(`${number}÷1`)).toEqual(true);
        expect(equality.isCorrect(`${number}+0`)).toEqual(true);
        expect(equality.isCorrect(`${number}-0`)).toEqual(true);
        expect(equality.isCorrect(`${number}+1`)).toEqual(false);
        expect(equality.isCorrect(`${number}÷2`)).toEqual(false);
    });
});

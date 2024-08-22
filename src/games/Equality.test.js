import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Equality from './Equality';

Enzyme.configure({ adapter: new Adapter() });

describe('equalities', () => {
    it('ensures resetting the number always gives a new one', () => {
        const equalities = new Equality();
        let oldNumber = equalities.getNumber();
        for (let x = 0; x < 100; x++) {
            equalities.resetNumber();
            expect(equalities.getNumber()).not.toEqual(oldNumber);
            oldNumber = equalities.getNumber();
        }
    });

    it('returns equalities', () => {
        expect(new Equality().getName()).toEqual('Equality');
    });

    it('returns correct screen', () => {
        const wrapper = Enzyme.shallow(new Equality().getScreen());
        expect(wrapper.find('.title').text()).toEqual(
            `Equals ${wrapper.state().game.getNumber()}`
        );
    });

    it('returns proper title', () => {
        const equalities = new Equality();
        expect(equalities.getTitle()).toEqual(
            `Equals ${equalities.getNumber()}`
        );
    });

    it('returns proper error', () => {
        const equalities = new Equality();
        expect(equalities.getError('2+5')).toEqual(`Oops!  "2+5=7"`);
    });

    it('defaults to return base not lower than 1', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Equality().getNumber()).toBeGreaterThanOrEqual(1);
        }
    });

    it('returns base not lower than provided', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Equality(10).getNumber()).toBeGreaterThanOrEqual(10);
            expect(new Equality(25).getNumber()).toEqual(25);
        }
    });

    it('default to return base not higher than 25', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Equality().getNumber()).toBeLessThanOrEqual(25);
        }
    });

    it('returns base not higher than provided', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Equality(3, 10).getNumber()).toBeLessThanOrEqual(10);
            expect(new Equality(3, 3).getNumber()).toEqual(3);
        }
    });

    xit('defaults to return equality nothing lower than 1', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Equality().getEquality()).toBeGreaterThanOrEqual(1);
        }
    });

    xit('defaults to return equality nothing greater than number', () => {
        for (let x = 0; x < 100; x++) {
            const equalities = new Equality();
            expect(equalities.getEquality()).toBeLessThanOrEqual(
                equalities.getNumber()
            );
        }
    });

    it('returns a valid equality', () => {
        const operations = ['+', '-', 'x', '÷'];
        for (let x = 0; x < 100; x++) {
            const equalities = new Equality();
            const equality = equalities.getEquality(
                operations[Math.floor(Math.random() * 4)]
            );
            expect(equalities.isCorrect(equality)).toBeTruthy();
        }
    });

    it('returns an invalid equality', () => {
        const operations = ['+', '-', 'x', '÷'];
        for (let x = 0; x < 100; x++) {
            const equalities = new Equality(1, 1000);
            const equality = equalities.getNonEquality(
                operations[Math.floor(Math.random() * 4)]
            );
            expect(equalities.isCorrect(equality)).toBeFalsy();
        }
    });

    xit('defaults to return non equality nothing lower than 1', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Equality().getNonEquality()).toBeGreaterThanOrEqual(1);
        }
    });

    xit('defaults to return non equality nothing greater than number', () => {
        for (let x = 0; x < 100; x++) {
            const equalities = new Equality();
            expect(equalities.getNonEquality()).toBeLessThanOrEqual(
                equalities.getNumber()
            );
        }
    });

    xit('defaults to return filler nothing lower than 1', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Equality().getFiller()).toBeGreaterThanOrEqual(1);
        }
    });

    xit('defaults to return filler nothing greater than number', () => {
        for (let x = 0; x < 100; x++) {
            const equalities = new Equality();
            expect(equalities.getFiller()).toBeLessThanOrEqual(
                equalities.getNumber()
            );
        }
    });

    it('verifies some simple equalities', () => {
        const equalities = new Equality();
        const number = equalities.getNumber();
        expect(equalities.isCorrect(`${number - 2}+2`)).toBeTruthy();
        expect(equalities.isCorrect(`${number + 2}-2`)).toBeTruthy();
        expect(equalities.isCorrect(`${number}x1`)).toBeTruthy();
        expect(equalities.isCorrect(`${number}÷1`)).toBeTruthy();
        expect(equalities.isCorrect(`7÷2`)).toBeFalsy();
        expect(equalities.isCorrect(`3.3x2`)).toBeFalsy();
    });
});

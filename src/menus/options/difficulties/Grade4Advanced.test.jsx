import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { optionsMenu } from '../Difficulty.test';
import { Grade4Advanced } from '../Difficulty';

Enzyme.configure({ adapter: new Adapter() });

describe('grade4Advanced', () => {
    it('4th grade advanced returns correct name', () => {
        expect(new Grade4Advanced().getName()).toEqual('4th Grade Advanced');
    });

    it('4th grade advanced returns correct screen', () => {
        optionsMenu(new Grade4Advanced());
        expect(localStorage.getItem('difficulty')).toEqual('3');
    });

    it('should return proper multiples', () => {
        const multiples = Grade4Advanced.getMultiples();
        expect(multiples.use).toEqual(true);
        expect(multiples.range.min).toEqual(2);
        expect(multiples.range.max).toEqual(9);
        expect(multiples.other).toEqual(9);
    });

    it('should return proper factors', () => {
        const factors = Grade4Advanced.getFactors();
        expect(factors.use).toEqual(true);
        expect(factors.range.min).toEqual(3);
        expect(factors.range.max).toEqual(64);
        expect(factors.other).toEqual(undefined);
    });

    it('should return proper primes', () => {
        const primes = Grade4Advanced.getPrimes();
        expect(primes.use).toEqual(false);
        expect(primes.range.min).toEqual(2);
        expect(primes.range.max).toEqual(50);
        expect(primes.other).toEqual(undefined);
    });

    it('should return proper equality', () => {
        const equality = Grade4Advanced.getEquality();
        expect(equality.use).toEqual(true);
        expect(equality.range.min).toEqual(1);
        expect(equality.range.max).toEqual(24);
        expect(equality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper inequality', () => {
        const inequality = Grade4Advanced.getInequality();
        expect(inequality.use).toEqual(true);
        expect(inequality.range.min).toEqual(1);
        expect(inequality.range.max).toEqual(20);
        expect(inequality.other).toEqual(['+', '-', 'x']);
    });

    it('should return proper challenge', () => {
        const challenge = Grade4Advanced.getChallenge();
        expect(challenge.use).toEqual(true);
        expect(challenge.range).toEqual(undefined);
        expect(challenge.other).toEqual(undefined);
    });
});

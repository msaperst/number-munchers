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
        expect(multiples.use).toBeTruthy();
        expect(multiples.range.min).toEqual(2);
        expect(multiples.range.max).toEqual(11);
        expect(multiples.other).toEqual(9);
    });

    it('should return proper factors', () => {
        const factors = Grade4Advanced.getFactors();
        expect(factors.use).toBeTruthy();
        expect(factors.range.min).toEqual(3);
        expect(factors.range.max).toEqual(40);
        expect(factors.other).toEqual(undefined);
    });

    it('should return proper primes', () => {
        const primes = Grade4Advanced.getPrimes();
        expect(primes.use).toBeFalsy();
        expect(primes.range.min).toEqual(2);
        expect(primes.range.max).toEqual(40);
        expect(primes.other).toEqual(undefined);
    });

    it('should return proper equality', () => {
        const equality = Grade4Advanced.getEquality();
        expect(equality.use).toBeTruthy();
        expect(equality.range.min).toEqual(1);
        expect(equality.range.max).toEqual(40);
        expect(equality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper inequality', () => {
        const inequality = Grade4Advanced.getInequality();
        expect(inequality.use).toBeTruthy();
        expect(inequality.range.min).toEqual(1);
        expect(inequality.range.max).toEqual(40);
        expect(inequality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper challenge', () => {
        const challenge = Grade4Advanced.getChallenge();
        expect(challenge.use).toBeTruthy();
        expect(challenge.range).toEqual(undefined);
        expect(challenge.other).toEqual(undefined);
    });
});

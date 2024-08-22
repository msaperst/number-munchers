import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { optionsMenu } from '../Difficulty.test';
import { Grade3Advanced } from '../Difficulty';

Enzyme.configure({ adapter: new Adapter() });

describe('grade3Advanced', () => {
    it('3rd grade advanced returns correct name', () => {
        expect(new Grade3Advanced().getName()).toEqual('3rd Grade Advanced');
    });

    it('3rd grade advanced returns correct screen', () => {
        optionsMenu(new Grade3Advanced());
        expect(localStorage.getItem('difficulty')).toEqual('1');
    });

    it('should return proper multiples', () => {
        const multiples = Grade3Advanced.getMultiples();
        expect(multiples.use).toBeTruthy();
        expect(multiples.range.min).toEqual(2);
        expect(multiples.range.max).toEqual(6);
        expect(multiples.other).toEqual(5);
    });

    it('should return proper factors', () => {
        const factors = Grade3Advanced.getFactors();
        expect(factors.use).toBeTruthy();
        expect(factors.range.min).toEqual(3);
        expect(factors.range.max).toEqual(25);
        expect(factors.other).toEqual(undefined);
    });

    it('should return proper primes', () => {
        const primes = Grade3Advanced.getPrimes();
        expect(primes.use).toBeFalsy();
        expect(primes.range.min).toEqual(2);
        expect(primes.range.max).toEqual(25);
        expect(primes.other).toEqual(undefined);
    });

    it('should return proper equality', () => {
        const equality = Grade3Advanced.getEquality();
        expect(equality.use).toBeTruthy();
        expect(equality.range.min).toEqual(1);
        expect(equality.range.max).toEqual(25);
        expect(equality.other).toEqual(['+', '-']);
    });

    it('should return proper inequality', () => {
        const inequality = Grade3Advanced.getInequality();
        expect(inequality.use).toBeTruthy();
        expect(inequality.range.min).toEqual(1);
        expect(inequality.range.max).toEqual(25);
        expect(inequality.other).toEqual(['+', '-']);
    });

    it('should return proper challenge', () => {
        const challenge = Grade3Advanced.getChallenge();
        expect(challenge.use).toBeTruthy();
        expect(challenge.range).toEqual(undefined);
        expect(challenge.other).toEqual(undefined);
    });
});

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { optionsMenu } from '../Difficulty.test';
import { Grade5Easy } from '../Difficulty';

Enzyme.configure({ adapter: new Adapter() });

describe('grade5Easy', () => {
    it('5th grade easy returns correct name', () => {
        expect(new Grade5Easy().getName()).toEqual('5th Grade Easy');
    });

    it('5th grade easy returns correct screen', () => {
        optionsMenu(new Grade5Easy());
        expect(localStorage.getItem('difficulty')).toEqual('4');
    });

    it('should return proper multiples', () => {
        const multiples = Grade5Easy.getMultiples();
        expect(multiples.use).toBeTruthy();
        expect(multiples.range.min).toEqual(2);
        expect(multiples.range.max).toEqual(12);
        expect(multiples.other).toEqual(10);
    });

    it('should return proper factors', () => {
        const factors = Grade5Easy.getFactors();
        expect(factors.use).toBeTruthy();
        expect(factors.range.min).toEqual(3);
        expect(factors.range.max).toEqual(50);
        expect(factors.other).toEqual(undefined);
    });

    it('should return proper primes', () => {
        const primes = Grade5Easy.getPrimes();
        expect(primes.use).toBeFalsy();
        expect(primes.range.min).toEqual(2);
        expect(primes.range.max).toEqual(50);
        expect(primes.other).toEqual(undefined);
    });

    it('should return proper equality', () => {
        const equality = Grade5Easy.getEquality();
        expect(equality.use).toBeTruthy();
        expect(equality.range.min).toEqual(1);
        expect(equality.range.max).toEqual(50);
        expect(equality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper inequality', () => {
        const inequality = Grade5Easy.getInequality();
        expect(inequality.use).toBeTruthy();
        expect(inequality.range.min).toEqual(1);
        expect(inequality.range.max).toEqual(50);
        expect(inequality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper challenge', () => {
        const challenge = Grade5Easy.getChallenge();
        expect(challenge.use).toBeTruthy();
        expect(challenge.range).toEqual(undefined);
        expect(challenge.other).toEqual(undefined);
    });
});

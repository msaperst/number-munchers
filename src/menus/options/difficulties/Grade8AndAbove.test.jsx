import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { optionsMenu } from '../Difficulty.test';
import { Grade8AndAbove } from '../Difficulty';

Enzyme.configure({ adapter: new Adapter() });

describe('grade8AndAbove', () => {
    it('8th grade and above returns correct name', () => {
        expect(new Grade8AndAbove().getName()).toEqual('8th Grade and Above');
    });

    it('8th grade and above returns correct screen', () => {
        optionsMenu(new Grade8AndAbove());
        expect(localStorage.getItem('difficulty')).toEqual('10');
    });

    it('should return proper multiples', () => {
        const multiples = Grade8AndAbove.getMultiples();
        expect(multiples.use).toEqual(true);
        expect(multiples.range.min).toEqual(2);
        expect(multiples.range.max).toEqual(20);
        expect(multiples.sequence).toEqual(false);
        expect(multiples.other).toEqual(50);
    });

    it('should return proper factors', () => {
        const factors = Grade8AndAbove.getFactors();
        expect(factors.use).toEqual(true);
        expect(factors.range.min).toEqual(3);
        expect(factors.range.max).toEqual(99);
        expect(factors.sequence).toEqual(false);
        expect(factors.other).toEqual(undefined);
    });

    it('should return proper primes', () => {
        const primes = Grade8AndAbove.getPrimes();
        expect(primes.use).toEqual(true);
        expect(primes.range.min).toEqual(2);
        expect(primes.range.max).toEqual(199);
        expect(primes.sequence).toEqual(undefined);
        expect(primes.other).toEqual(undefined);
    });

    it('should return proper equality', () => {
        const equality = Grade8AndAbove.getEquality();
        expect(equality.use).toEqual(true);
        expect(equality.range.min).toEqual(1);
        expect(equality.range.max).toEqual(50);
        expect(equality.sequence).toEqual(false);
        expect(equality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper inequality', () => {
        const inequality = Grade8AndAbove.getInequality();
        expect(inequality.use).toEqual(true);
        expect(inequality.range.min).toEqual(1);
        expect(inequality.range.max).toEqual(50);
        expect(inequality.sequence).toEqual(false);
        expect(inequality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper challenge', () => {
        const challenge = Grade8AndAbove.getChallenge();
        expect(challenge.use).toEqual(true);
        expect(challenge.range).toEqual(undefined);
        expect(challenge.sequence).toEqual(undefined);
        expect(challenge.other).toEqual(undefined);
    });
});

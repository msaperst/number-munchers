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
        expect(multiples.use).toEqual(true);
        expect(multiples.range.min).toEqual(2);
        expect(multiples.range.max).toEqual(9);
        expect(multiples.sequence).toEqual(false);
        expect(multiples.other).toEqual(9);
    });

    it('should return proper factors', () => {
        const factors = Grade5Easy.getFactors();
        expect(factors.use).toEqual(true);
        expect(factors.range.min).toEqual(3);
        expect(factors.range.max).toEqual(64);
        expect(factors.sequence).toEqual(false);
        expect(factors.other).toEqual(undefined);
    });

    it('should return proper primes', () => {
        const primes = Grade5Easy.getPrimes();
        expect(primes.use).toEqual(false);
        expect(primes.range.min).toEqual(2);
        expect(primes.range.max).toEqual(50);
        expect(primes.sequence).toEqual(undefined);
        expect(primes.other).toEqual(undefined);
    });

    it('should return proper equality', () => {
        const equality = Grade5Easy.getEquality();
        expect(equality.use).toEqual(true);
        expect(equality.range.min).toEqual(1);
        expect(equality.range.max).toEqual(24);
        expect(equality.sequence).toEqual(false);
        expect(equality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper inequality', () => {
        const inequality = Grade5Easy.getInequality();
        expect(inequality.use).toEqual(true);
        expect(inequality.range.min).toEqual(1);
        expect(inequality.range.max).toEqual(24);
        expect(inequality.sequence).toEqual(false);
        expect(inequality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper challenge', () => {
        const challenge = Grade5Easy.getChallenge();
        expect(challenge.use).toEqual(true);
        expect(challenge.range).toEqual(undefined);
        expect(challenge.sequence).toEqual(undefined);
        expect(challenge.other).toEqual(undefined);
    });
});

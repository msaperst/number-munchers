import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { optionsMenu } from '../Difficulty.test';
import { Grade3Easy } from '../Difficulty';

Enzyme.configure({ adapter: new Adapter() });

describe('grade3Easy', () => {
    it('3rd grade easy returns correct name', () => {
        expect(new Grade3Easy().getName()).toEqual('3rd Grade Easy');
    });

    it('3rd grade easy returns correct screen', () => {
        optionsMenu(new Grade3Easy());
        expect(localStorage.getItem('difficulty')).toEqual('0');
    });

    it('should return proper multiples', () => {
        const multiples = Grade3Easy.getMultiples();
        expect(multiples.use).toEqual(false);
        expect(multiples.range.min).toEqual(2);
        expect(multiples.range.max).toEqual(5);
        expect(multiples.other).toEqual(5);
    });

    it('should return proper factors', () => {
        const factors = Grade3Easy.getFactors();
        expect(factors.use).toEqual(false);
        expect(factors.range.min).toEqual(3);
        expect(factors.range.max).toEqual(5);
        expect(factors.other).toEqual(undefined);
    });

    it('should return proper primes', () => {
        const primes = Grade3Easy.getPrimes();
        expect(primes.use).toEqual(false);
        expect(primes.range.min).toEqual(2);
        expect(primes.range.max).toEqual(25);
        expect(primes.other).toEqual(undefined);
    });

    it('should return proper equality', () => {
        const equality = Grade3Easy.getEquality();
        expect(equality.use).toEqual(true);
        expect(equality.range.min).toEqual(1);
        expect(equality.range.max).toEqual(20);
        expect(equality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper inequality', () => {
        const inequality = Grade3Easy.getInequality();
        expect(inequality.use).toEqual(true);
        expect(inequality.range.min).toEqual(1);
        expect(inequality.range.max).toEqual(10);
        expect(inequality.other).toEqual(['+', '-']);
    });

    it('should return proper challenge', () => {
        const challenge = Grade3Easy.getChallenge();
        expect(challenge.use).toEqual(true);
        expect(challenge.range).toEqual(undefined);
        expect(challenge.other).toEqual(undefined);
    });
});

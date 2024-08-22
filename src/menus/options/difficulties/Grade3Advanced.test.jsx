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
        expect(multiples.use).toEqual(true);
        expect(multiples.range.min).toEqual(2);
        expect(multiples.range.max).toEqual(5);
        expect(multiples.other).toEqual(5);
    });

    it('should return proper factors', () => {
        const factors = Grade3Advanced.getFactors();
        expect(factors.use).toEqual(true);
        expect(factors.range.min).toEqual(3);
        expect(factors.range.max).toEqual(25);
        expect(factors.other).toEqual(undefined);
    });

    it('should return proper primes', () => {
        const primes = Grade3Advanced.getPrimes();
        expect(primes.use).toEqual(false);
        expect(primes.range.min).toEqual(2);
        expect(primes.range.max).toEqual(25);
        expect(primes.other).toEqual(undefined);
    });

    it('should return proper equality', () => {
        const equality = Grade3Advanced.getEquality();
        expect(equality.use).toEqual(true);
        expect(equality.range.min).toEqual(1);
        expect(equality.range.max).toEqual(20);
        expect(equality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper inequality', () => {
        const inequality = Grade3Advanced.getInequality();
        expect(inequality.use).toEqual(true);
        expect(inequality.range.min).toEqual(1);
        expect(inequality.range.max).toEqual(20);
        expect(inequality.other).toEqual(['+', '-']);
    });

    it('should return proper challenge', () => {
        const challenge = Grade3Advanced.getChallenge();
        expect(challenge.use).toEqual(true);
        expect(challenge.range).toEqual(undefined);
        expect(challenge.other).toEqual(undefined);
    });
});

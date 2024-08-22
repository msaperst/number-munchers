import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { optionsMenu } from '../Difficulty.test';
import { Grade5Advanced } from '../Difficulty';

Enzyme.configure({ adapter: new Adapter() });

describe('grade5Advanced', () => {
    it('5th grade advanced returns correct name', () => {
        expect(new Grade5Advanced().getName()).toEqual('5th Grade Advanced');
    });

    it('5th grade advanced returns correct screen', () => {
        optionsMenu(new Grade5Advanced());
        expect(localStorage.getItem('difficulty')).toEqual('5');
    });

    it('should return proper multiples', () => {
        const multiples = Grade5Advanced.getMultiples();
        expect(multiples.use).toBeTruthy();
        expect(multiples.range.min).toEqual(2);
        expect(multiples.range.max).toEqual(13);
        expect(multiples.other).toEqual(11);
    });

    it('should return proper factors', () => {
        const factors = Grade5Advanced.getFactors();
        expect(factors.use).toBeTruthy();
        expect(factors.range.min).toEqual(3);
        expect(factors.range.max).toEqual(60);
        expect(factors.other).toEqual(undefined);
    });

    it('should return proper primes', () => {
        const primes = Grade5Advanced.getPrimes();
        expect(primes.use).toBeTruthy();
        expect(primes.range.min).toEqual(2);
        expect(primes.range.max).toEqual(60);
        expect(primes.other).toEqual(undefined);
    });

    it('should return proper equality', () => {
        const equality = Grade5Advanced.getEquality();
        expect(equality.use).toBeTruthy();
        expect(equality.range.min).toEqual(1);
        expect(equality.range.max).toEqual(60);
        expect(equality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper inequality', () => {
        const inequality = Grade5Advanced.getInequality();
        expect(inequality.use).toBeTruthy();
        expect(inequality.range.min).toEqual(1);
        expect(inequality.range.max).toEqual(60);
        expect(inequality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper challenge', () => {
        const challenge = Grade5Advanced.getChallenge();
        expect(challenge.use).toBeTruthy();
        expect(challenge.range).toEqual(undefined);
        expect(challenge.other).toEqual(undefined);
    });
});

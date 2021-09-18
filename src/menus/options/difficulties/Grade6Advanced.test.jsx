import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { optionsMenu } from '../Difficulty.test';
import { Grade6Advanced } from '../Difficulty';

Enzyme.configure({ adapter: new Adapter() });

describe('grade6Advanced', () => {
    it('6th grade advanced returns correct name', () => {
        expect(new Grade6Advanced().getName()).toEqual('6th Grade Advanced');
    });

    it('6th grade advanced returns correct screen', () => {
        optionsMenu(new Grade6Advanced());
        expect(localStorage.getItem('difficulty')).toEqual('7');
    });

    it('should return proper multiples', () => {
        const multiples = Grade6Advanced.getMultiples();
        expect(multiples.use).toEqual(true);
        expect(multiples.range.min).toEqual(2);
        expect(multiples.range.max).toEqual(12);
        expect(multiples.sequence).toEqual(false);
        expect(multiples.other).toEqual(13);
    });

    it('should return proper factors', () => {
        const factors = Grade6Advanced.getFactors();
        expect(factors.use).toEqual(true);
        expect(factors.range.min).toEqual(3);
        expect(factors.range.max).toEqual(99);
        expect(factors.sequence).toEqual(false);
        expect(factors.other).toEqual(undefined);
    });

    it('should return proper primes', () => {
        const primes = Grade6Advanced.getPrimes();
        expect(primes.use).toEqual(true);
        expect(primes.range.min).toEqual(2);
        expect(primes.range.max).toEqual(99);
        expect(primes.sequence).toEqual(undefined);
        expect(primes.other).toEqual(undefined);
    });

    it('should return proper equality', () => {
        const equality = Grade6Advanced.getEquality();
        expect(equality.use).toEqual(true);
        expect(equality.range.min).toEqual(1);
        expect(equality.range.max).toEqual(50);
        expect(equality.sequence).toEqual(false);
        expect(equality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper inequality', () => {
        const inequality = Grade6Advanced.getInequality();
        expect(inequality.use).toEqual(true);
        expect(inequality.range.min).toEqual(1);
        expect(inequality.range.max).toEqual(50);
        expect(inequality.sequence).toEqual(false);
        expect(inequality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper challenge', () => {
        const challenge = Grade6Advanced.getChallenge();
        expect(challenge.use).toEqual(true);
        expect(challenge.range).toEqual(undefined);
        expect(challenge.sequence).toEqual(undefined);
        expect(challenge.other).toEqual(undefined);
    });
});

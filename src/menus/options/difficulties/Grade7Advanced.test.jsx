import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { optionsMenu } from '../Difficulty.test';
import { Grade7Advanced } from '../Difficulty';

Enzyme.configure({ adapter: new Adapter() });

describe('grade7Advanced', () => {
    it('7th grade advanced returns correct name', () => {
        expect(new Grade7Advanced().getName()).toEqual('7th Grade Advanced');
    });

    it('7th grade advanced returns correct screen', () => {
        optionsMenu(new Grade7Advanced());
        expect(localStorage.getItem('difficulty')).toEqual('9');
    });

    it('should return proper multiples', () => {
        const multiples = Grade7Advanced.getMultiples();
        expect(multiples.use).toBeTruthy();
        expect(multiples.range.min).toEqual(2);
        expect(multiples.range.max).toEqual(17);
        expect(multiples.other).toEqual(15);
    });

    it('should return proper factors', () => {
        const factors = Grade7Advanced.getFactors();
        expect(factors.use).toBeTruthy();
        expect(factors.range.min).toEqual(3);
        expect(factors.range.max).toEqual(100);
        expect(factors.other).toEqual(undefined);
    });

    it('should return proper primes', () => {
        const primes = Grade7Advanced.getPrimes();
        expect(primes.use).toBeTruthy();
        expect(primes.range.min).toEqual(2);
        expect(primes.range.max).toEqual(100);
        expect(primes.other).toEqual(undefined);
    });

    it('should return proper equality', () => {
        const equality = Grade7Advanced.getEquality();
        expect(equality.use).toBeTruthy();
        expect(equality.range.min).toEqual(1);
        expect(equality.range.max).toEqual(100);
        expect(equality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper inequality', () => {
        const inequality = Grade7Advanced.getInequality();
        expect(inequality.use).toBeTruthy();
        expect(inequality.range.min).toEqual(1);
        expect(inequality.range.max).toEqual(100);
        expect(inequality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper challenge', () => {
        const challenge = Grade7Advanced.getChallenge();
        expect(challenge.use).toBeTruthy();
        expect(challenge.range).toEqual(undefined);
        expect(challenge.other).toEqual(undefined);
    });
});

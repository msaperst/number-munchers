import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { optionsMenu } from '../Difficulty.test';
import { Grade7Easy } from '../Difficulty';

Enzyme.configure({ adapter: new Adapter() });

describe('grade7Easy', () => {
    it('7th grade easy returns correct name', () => {
        expect(new Grade7Easy().getName()).toEqual('7th Grade Easy');
    });

    it('7th grade easy returns correct screen', () => {
        optionsMenu(new Grade7Easy());
        expect(localStorage.getItem('difficulty')).toEqual('8');
    });

    it('should return proper multiples', () => {
        const multiples = Grade7Easy.getMultiples();
        expect(multiples.use).toBeTruthy();
        expect(multiples.range.min).toEqual(2);
        expect(multiples.range.max).toEqual(16);
        expect(multiples.other).toEqual(14);
    });

    it('should return proper factors', () => {
        const factors = Grade7Easy.getFactors();
        expect(factors.use).toBeTruthy();
        expect(factors.range.min).toEqual(3);
        expect(factors.range.max).toEqual(90);
        expect(factors.other).toEqual(undefined);
    });

    it('should return proper primes', () => {
        const primes = Grade7Easy.getPrimes();
        expect(primes.use).toBeTruthy();
        expect(primes.range.min).toEqual(2);
        expect(primes.range.max).toEqual(90);
        expect(primes.other).toEqual(undefined);
    });

    it('should return proper equality', () => {
        const equality = Grade7Easy.getEquality();
        expect(equality.use).toBeTruthy();
        expect(equality.range.min).toEqual(1);
        expect(equality.range.max).toEqual(90);
        expect(equality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper inequality', () => {
        const inequality = Grade7Easy.getInequality();
        expect(inequality.use).toBeTruthy();
        expect(inequality.range.min).toEqual(1);
        expect(inequality.range.max).toEqual(90);
        expect(inequality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper challenge', () => {
        const challenge = Grade7Easy.getChallenge();
        expect(challenge.use).toBeTruthy();
        expect(challenge.range).toEqual(undefined);
        expect(challenge.other).toEqual(undefined);
    });
});

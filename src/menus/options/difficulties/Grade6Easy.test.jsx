import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { optionsMenu } from '../Difficulty.test';
import { Grade6Easy } from '../Difficulty';

Enzyme.configure({ adapter: new Adapter() });

describe('grade6Easy', () => {
    it('6th grade easy returns correct name', () => {
        expect(new Grade6Easy().getName()).toEqual('6th Grade Easy');
    });

    it('6th grade easy returns correct screen', () => {
        optionsMenu(new Grade6Easy());
        expect(localStorage.getItem('difficulty')).toEqual('6');
    });

    it('should return proper multiples', () => {
        const multiples = Grade6Easy.getMultiples();
        expect(multiples.use).toEqual(true);
        expect(multiples.range.min).toEqual(2);
        expect(multiples.range.max).toEqual(11);
        expect(multiples.sequence).toEqual(false);
        expect(multiples.other).toEqual(13);
    });

    it('should return proper factors', () => {
        const factors = Grade6Easy.getFactors();
        expect(factors.use).toEqual(true);
        expect(factors.range.min).toEqual(3);
        expect(factors.range.max).toEqual(81);
        expect(factors.sequence).toEqual(false);
        expect(factors.other).toEqual(undefined);
    });

    it('should return proper primes', () => {
        const primes = Grade6Easy.getPrimes();
        expect(primes.use).toEqual(true);
        expect(primes.range.min).toEqual(2);
        expect(primes.range.max).toEqual(50);
        expect(primes.sequence).toEqual(undefined);
        expect(primes.other).toEqual(undefined);
    });

    it('should return proper equality', () => {
        const equality = Grade6Easy.getEquality();
        expect(equality.use).toEqual(true);
        expect(equality.range.min).toEqual(1);
        expect(equality.range.max).toEqual(50);
        expect(equality.sequence).toEqual(false);
        expect(equality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper inequality', () => {
        const inequality = Grade6Easy.getInequality();
        expect(inequality.use).toEqual(true);
        expect(inequality.range.min).toEqual(1);
        expect(inequality.range.max).toEqual(50);
        expect(inequality.sequence).toEqual(false);
        expect(inequality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper challenge', () => {
        const challenge = Grade6Easy.getChallenge();
        expect(challenge.use).toEqual(true);
        expect(challenge.range).toEqual(undefined);
        expect(challenge.sequence).toEqual(undefined);
        expect(challenge.other).toEqual(undefined);
    });
});

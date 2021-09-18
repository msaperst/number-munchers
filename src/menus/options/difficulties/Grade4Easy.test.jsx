import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { optionsMenu } from '../Difficulty.test';
import { Grade4Easy } from '../Difficulty';

Enzyme.configure({ adapter: new Adapter() });

describe('grade4Easy', () => {
    it('4th grade easy returns correct name', () => {
        expect(new Grade4Easy().getName()).toEqual('4th Grade Easy');
    });

    it('4th grade easy returns correct screen', () => {
        optionsMenu(new Grade4Easy());
        expect(localStorage.getItem('difficulty')).toEqual('2');
    });

    it('should return proper multiples', () => {
        const multiples = Grade4Easy.getMultiples();
        expect(multiples.use).toEqual(true);
        expect(multiples.range.min).toEqual(2);
        expect(multiples.range.max).toEqual(9);
        expect(multiples.sequence).toEqual(true);
        expect(multiples.other).toEqual(5);
    });

    it('should return proper factors', () => {
        const factors = Grade4Easy.getFactors();
        expect(factors.use).toEqual(true);
        expect(factors.range.min).toEqual(3);
        expect(factors.range.max).toEqual(25);
        expect(factors.sequence).toEqual(true);
        expect(factors.other).toEqual(undefined);
    });

    it('should return proper primes', () => {
        const primes = Grade4Easy.getPrimes();
        expect(primes.use).toEqual(false);
        expect(primes.range.min).toEqual(2);
        expect(primes.range.max).toEqual(50);
        expect(primes.sequence).toEqual(undefined);
        expect(primes.other).toEqual(undefined);
    });

    it('should return proper equality', () => {
        const equality = Grade4Easy.getEquality();
        expect(equality.use).toEqual(true);
        expect(equality.range.min).toEqual(1);
        expect(equality.range.max).toEqual(24);
        expect(equality.sequence).toEqual(true);
        expect(equality.other).toEqual(['+', '-', 'x', '÷']);
    });

    it('should return proper inequality', () => {
        const inequality = Grade4Easy.getInequality();
        expect(inequality.use).toEqual(true);
        expect(inequality.range.min).toEqual(1);
        expect(inequality.range.max).toEqual(20);
        expect(inequality.sequence).toEqual(true);
        expect(inequality.other).toEqual(['+', '-']);
    });

    it('should return proper challenge', () => {
        const challenge = Grade4Easy.getChallenge();
        expect(challenge.use).toEqual(true);
        expect(challenge.range).toEqual(undefined);
        expect(challenge.sequence).toEqual(undefined);
        expect(challenge.other).toEqual(undefined);
    });
});

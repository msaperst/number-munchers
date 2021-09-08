import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Primes from './Primes';

Enzyme.configure({ adapter: new Adapter() });

describe('primes', () => {
    it('ensures resetting the number gives null', () => {
        const primes = new Primes();
        expect(primes.getNumber()).toEqual(null);
    });

    it('returns primes', () => {
        expect(new Primes().getName()).toEqual('Primes');
    });

    it('returns correct screen', () => {
        const wrapper = Enzyme.shallow(new Primes().getScreen());
        expect(wrapper.find('.title').text()).toEqual(`Prime Numbers`);
    });

    it('returns proper title', () => {
        expect(new Primes().getTitle()).toEqual('Prime Numbers');
    });

    it('returns proper error', () => {
        expect(new Primes().getError(5)).toEqual(
            'The number "5" is not prime.'
        );
    });

    it('has no associated number', () => {
        expect(new Primes().getNumber()).toEqual(null);
    });

    it('defaults to return prime nothing lower than 2', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Primes().getPrime()).toBeGreaterThanOrEqual(2);
        }
    });

    it('returns prime nothing lower than provided', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Primes(5).getPrime()).toBeGreaterThanOrEqual(5);
        }
    });

    it('defaults to return prime nothing greater 7', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Primes().getPrime()).toBeLessThanOrEqual(7);
        }
    });

    it('returns prime nothing greater than provided', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Primes(2, 100).getPrime()).toBeLessThanOrEqual(100);
            expect(new Primes(97, 97).getPrime()).toEqual(97);
        }
    });

    it('returns a valid prime', () => {
        for (let x = 0; x < 100; x++) {
            const prime = new Primes(200).getPrime();
            expect(prime).not.toEqual(1);
            for (let i = 2; i < 100; i++) {
                expect(prime % i).not.toEqual(0);
            }
        }
    });

    it('defaults to return not prime nothing lower than 1', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Primes().getNonPrime()).toBeGreaterThanOrEqual(1);
        }
    });

    it('defaults to return not prime nothing greater 7', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Primes().getNonPrime()).toBeLessThanOrEqual(7);
        }
    });

    it('returns non prime nothing greater than provided', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Primes(2, 100).getNonPrime()).toBeLessThanOrEqual(100);
        }
    });

    it('returns an invalid prime', () => {
        for (let x = 0; x < 100; x++) {
            const notPrime = new Primes(2, 200).getNonPrime();
            let isNotPrime = false;
            for (let i = 2; i <= notPrime / 2; i++) {
                if (notPrime % i === 0) {
                    isNotPrime = true;
                    break;
                }
            }
            if (notPrime === 1) {
                isNotPrime = true;
            }
            expect(isNotPrime).toEqual(true);
        }
    });

    it('returns filler not less than 1', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Primes().getFiller()).toBeGreaterThanOrEqual(1);
        }
    });

    it('returns filler nothing greater than 7', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Primes().getFiller()).toBeLessThanOrEqual(7);
        }
    });

    it('returns filler nothing greater than provided', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Primes().getFiller(2, 100)).toBeLessThanOrEqual(100);
        }
    });

    it('verifies some simple primes', () => {
        const primes = new Primes();
        expect(primes.isCorrect(0)).toEqual(false);
        expect(primes.isCorrect(1)).toEqual(false);
        expect(primes.isCorrect(2)).toEqual(true);
        expect(primes.isCorrect(3)).toEqual(true);
    });
});

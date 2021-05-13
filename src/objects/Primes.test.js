import Primes from './Primes';

describe('primes', () => {
    it('ensures resetting the number gives null', () => {
        const primes = new Primes();
        expect(primes.getNumber()).toEqual(null);
    });

    it('returns primes', () => {
        expect(new Primes().getGame()).toEqual('Primes');
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

    it('defaults to return prime nothing greater 7', () => {
        for (let x = 0; x < 100; x++) {
            expect(new Primes().getPrime()).toBeLessThanOrEqual(7);
        }
    });

    it('verifies some simple primes', () => {
        const primes = new Primes();
        expect(primes.isPrime(0)).toEqual(false);
        expect(primes.isPrime(1)).toEqual(false);
        expect(primes.isPrime(2)).toEqual(true);
        expect(primes.isPrime(3)).toEqual(true);
    });
});

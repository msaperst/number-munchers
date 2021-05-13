import { GAME_TYPES } from './games';

class Primes {
    constructor(minNum = 2, maxNum = 7) {
        const primes = [
            2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61,
            67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137,
            157, 163, 167, 173, 179, 181, 191, 193, 197, 199,
        ];

        this.primes = primes.filter((x) => x >= minNum && x <= maxNum);

        this.minNum = minNum;
        this.maxNum = maxNum;

        this.resetNumber();
    }

    resetNumber() {
        this.number = null;
    }

    // eslint-disable-next-line class-methods-use-this
    getGame() {
        return GAME_TYPES.PRIMES;
    }

    getNumber() {
        return this.number;
    }

    // eslint-disable-next-line class-methods-use-this
    getTitle() {
        return `Prime Numbers`;
    }

    getPrime() {
        // 2/5 of our numbers should match
        if (Math.random() > 0.4) {
            return this.primes[Math.floor(Math.random() * this.primes.length)];
        }

        // the others will just be random
        return Math.floor(
            this.minNum + Math.random() * (this.maxNum - this.minNum)
        );
    }

    isPrime(number) {
        return this.primes.includes(number);
    }

    // eslint-disable-next-line class-methods-use-this
    getError(number) {
        return `The number "${number}" is not prime.`;
    }
}

export default Primes;

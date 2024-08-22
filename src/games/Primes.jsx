import React from 'react';
import { GAME_TYPES } from './games';
// eslint-disable-next-line import/no-cycle
import Game from '../components/game/Game';
// eslint-disable-next-line import/no-cycle
import Difficulty from '../menus/options/Difficulty';

class Primes {
    constructor(minNum, maxNum) {
        const primeConfig = Difficulty.getDifficulty(
            localStorage.getItem('difficulty')
        ).getPrimes();
        this.minNum = minNum || primeConfig.range.min;
        this.maxNum = maxNum || primeConfig.range.max;

        const primes = [
            2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61,
            67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137,
            139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199,
        ];
        this.primes = primes.filter(
            (x) => x >= this.minNum && x <= this.maxNum
        );

        this.resetNumber();
    }

    resetNumber() {
        this.number = null;
    }

    // eslint-disable-next-line class-methods-use-this
    getName() {
        return GAME_TYPES.PRIMES;
    }

    getScreen() {
        return <Game game={this} />;
    }

    getNumber() {
        return this.number;
    }

    // eslint-disable-next-line class-methods-use-this
    getTitle() {
        return `Prime Numbers`;
    }

    getPrime() {
        return this.primes[Math.floor(Math.random() * this.primes.length)];
    }

    getNonPrime() {
        let nonPrime = 2;
        while (this.isCorrect(nonPrime)) {
            nonPrime = 1 + Math.floor(Math.random() * this.maxNum);
        }
        return nonPrime;
    }

    getFiller() {
        // 2/5 of our numbers should match
        if (Math.random() < 0.4) {
            return this.getPrime();
        }
        // the others will just be random
        return this.getNonPrime();
    }

    isCorrect(number) {
        return this.primes.includes(number);
    }

    // eslint-disable-next-line class-methods-use-this
    getError(number) {
        return `The number "${number}" is not prime.`;
    }
}

export default Primes;

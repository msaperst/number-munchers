import React from 'react';
import { GAME_TYPES } from './games';
import Game from '../components/game/Game';
import Difficulty from '../menus/options/Difficulty';

class Factors {
    constructor(minNum, maxNum) {
        const factorConfig = Difficulty.getDifficulty(
            localStorage.getItem('difficulty')
        ).getFactors();
        this.minNum = minNum || factorConfig.range.min;
        this.maxNum = maxNum || factorConfig.range.max;

        this.resetNumber();
    }

    resetNumber() {
        const oldNumber = this.number;
        while (oldNumber === this.number) {
            this.number = Math.floor(
                this.minNum + Math.random() * (this.maxNum - this.minNum + 1)
            );
        }
        this.factors = Array.from(Array(this.number + 1), (_, i) => i).filter(
            (i) => this.number % i === 0
        );
    }

    // eslint-disable-next-line class-methods-use-this
    getName() {
        return GAME_TYPES.FACTORS;
    }

    getScreen() {
        return <Game game={this} />;
    }

    getNumber() {
        return this.number;
    }

    getTitle() {
        return `${this.getName()} of ${this.number}`;
    }

    getFactor() {
        return this.factors[Math.floor(Math.random() * this.factors.length)];
    }

    getNonFactor() {
        let nonFactor = 1;
        while (this.isCorrect(nonFactor)) {
            nonFactor = 1 + Math.floor(Math.random() * this.number);
        }
        return nonFactor;
    }

    getFiller() {
        // 2/5 of our numbers should match
        if (Math.random() < 0.4) {
            return this.getFactor();
        }
        // the others will just be random
        return this.getNonFactor();
    }

    isCorrect(factor) {
        return this.factors.includes(factor);
    }

    getError(factor) {
        return `"${factor}" is not a factor of "${this.getNumber()}".`;
    }
}

export default Factors;

import React from 'react';
import { GAME_TYPES } from './games';
import Game from '../components/game/Game';
import Difficulty from '../menus/options/Difficulty';

class Multiples {
    constructor(minNum, maxNum, maxMult) {
        const multipleConfig = Difficulty.getDifficulty(
            localStorage.getItem('difficulty')
        ).getMultiples();
        this.minNum = minNum || multipleConfig.range.min;
        this.maxNum = maxNum || multipleConfig.range.max;
        this.minMult = 1;
        this.maxMult = maxMult || multipleConfig.other;

        this.resetNumber();
    }

    resetNumber() {
        const oldNumber = this.number;
        while (oldNumber === this.number) {
            this.number = Math.floor(
                this.minNum + Math.random() * (this.maxNum - this.minNum + 1)
            );
        }
    }

    // eslint-disable-next-line class-methods-use-this
    getName() {
        return GAME_TYPES.MULTIPLES;
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

    getMultiple() {
        const rand =
            this.minMult +
            Math.round(Math.random() * (this.maxMult - this.minMult));
        return this.number * rand;
    }

    getNonMultiple() {
        let nonMultiple = 0;
        while (this.isCorrect(nonMultiple)) {
            nonMultiple =
                Math.floor(Math.random() * (this.maxMult * this.number)) + 1;
        }
        return nonMultiple;
    }

    getFiller() {
        // 2/5 of our numbers should match
        if (Math.random() < 0.4) {
            return this.getMultiple();
        }
        // the others will just be random
        return this.getNonMultiple();
    }

    isCorrect(factor) {
        return factor % this.number === 0;
    }

    getError(factor) {
        return `"${factor}" is not a multiple of "${this.getNumber()}".`;
    }
}

export default Multiples;

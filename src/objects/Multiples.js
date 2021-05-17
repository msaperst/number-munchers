import { GAME_TYPES } from './games';

class Multiples {
    constructor(minNum = 2, maxNum = 5, maxMult = 5) {
        this.minNum = minNum;
        this.maxNum = maxNum;
        this.minMult = 1;
        this.maxMult = maxMult;

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
    getGame() {
        return GAME_TYPES.MULTIPLES;
    }

    getNumber() {
        return this.number;
    }

    getTitle() {
        return `${this.getGame()} of ${this.number}`;
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

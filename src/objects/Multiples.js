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

    getMultiple() {
        // 2/5 of our numbers should match
        if (Math.random() > 0.4) {
            return Math.floor(Math.random() * (this.maxMult * this.number));
        }

        // the others will just be random
        const rand = Math.floor(
            this.minMult + Math.random() * (this.maxMult - this.minMult)
        );
        return this.number * rand;
    }

    isMultiple(factor) {
        return factor % this.number === 0;
    }
}

export default Multiples;

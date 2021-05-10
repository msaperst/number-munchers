import { GAME_TYPES } from './games';

class Factors {
    constructor(minNum = 3, maxNum = 25) {
        this.minNum = minNum;
        this.maxNum = maxNum;

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
    getGame() {
        return GAME_TYPES.FACTORS;
    }

    getNumber() {
        return this.number;
    }

    getFactor() {
        // 2/5 of our numbers should match
        if (Math.random() < 0.4) {
            return this.factors[
                Math.floor(Math.random() * this.factors.length)
            ];
        }
        // the others will just be random
        return Math.floor(Math.random() * this.number);
    }

    isFactor(factor) {
        return this.factors.includes(factor);
    }
}

export default Factors;

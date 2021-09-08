import { GAME_TYPES } from './games';

class Equality {
    constructor(minNum = 1, maxNum = 20, operations = ['+', '-', 'x', '÷']) {
        this.minNum = minNum;
        this.maxNum = maxNum;
        this.operations = operations;

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
        return GAME_TYPES.EQUALITY;
    }

    getNumber() {
        return this.number;
    }

    getTitle() {
        return `Equals ${this.number}`;
    }

    // eslint-disable-next-line class-methods-use-this
    getFactors(number) {
        return Array.from(Array(number + 1), (_, i) => i).filter(
            (i) => number % i === 0
        );
    }

    getEquality(operation) {
        let first;
        let second;
        switch (operation) {
            case '+':
                second = Math.floor(Math.random() * Math.min(26, this.number));
                first = this.number - second;
                break;
            case '-':
                second = Math.floor(Math.random() * 10);
                first = this.number + second;
                break;
            case 'x':
                // eslint-disable-next-line no-case-declarations
                const factors = this.getFactors(this.number);
                second = factors[Math.floor(Math.random() * factors.length)];
                first = this.number / second;
                break;
            case '÷':
                second = Math.floor(Math.random() * 9) + 1;
                first = this.number * second;
                break;
            default:
                second = 0;
                first = 0;
        }
        return `${first}${operation}${second}`;
    }

    // eslint-disable-next-line class-methods-use-this,no-unused-vars
    getNonEquality(operation) {
        let first;
        let second;
        switch (operation) {
            case '+':
            case 'x':
                second = Math.floor(Math.random() * this.number * 0.75);
                first = Math.floor(Math.random() * this.number * 0.75);
                break;
            case '-':
                second = Math.floor(Math.random() * this.number) + this.number;
                first = Math.floor(Math.random() * this.number * 0.75);
                break;
            case '÷':
                second = Math.floor(Math.random() * 10);
                first = Math.floor(Math.random() * this.number) + this.number;
                break;
            default:
                second = 0;
                first = 0;
        }
        return `${first}${operation}${second}`;
    }

    getFiller() {
        const operation = this.operations[Math.floor(Math.random() * 4)];
        // 2/5 of our numbers should match
        if (Math.random() < 0.4) {
            return this.getEquality(operation);
        }
        // the others will just be random
        return this.getNonEquality(operation);
    }

    // eslint-disable-next-line class-methods-use-this
    getValue(input) {
        const first = parseInt(input.match(/\d+/g)[0], 10);
        const operation = input.match(/\D/g)[0];
        const second = parseInt(input.match(/\d+/g)[1], 10);
        switch (operation) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case 'x':
                return first * second;
            case '÷':
                return first / second;
            default:
                return 0;
        }
    }

    isCorrect(input) {
        return this.getValue(input) === this.number;
    }

    getError(input) {
        return `Oops!  "${input}=${this.getValue(input)}"`;
    }
}

export default Equality;

import React from 'react';
import { GAME_TYPES } from './games';
// eslint-disable-next-line import/no-cycle
import Game from '../components/game/Game';
// eslint-disable-next-line import/no-cycle
import Difficulty from '../menus/options/Difficulty';

class Equality {
    constructor(minNum, maxNum, operations) {
        const equalityConfig = Difficulty.getDifficulty(
            localStorage.getItem('difficulty')
        ).getEquality();
        this.minNum = minNum || equalityConfig.range.min;
        this.maxNum = maxNum || equalityConfig.range.max;
        this.operations = operations || equalityConfig.other;
        this.divisionFactor =
            (parseInt(localStorage.getItem('difficulty'), 10) || 0) * 15 + 5;
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
        return GAME_TYPES.EQUALITY;
    }

    getScreen() {
        return <Game game={this} />;
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
                second = Math.floor(Math.random() * this.number);
                first = this.number - second;
                break;
            case '-':
                first = Math.floor(Math.random() * this.number) + this.number;
                second = first - this.number;
                break;
            case 'x': {
                const factors = this.getFactors(this.number);
                second = factors[Math.floor(Math.random() * factors.length)];
                first = this.number / second;
                break;
            }
            case '÷':
                second = Math.floor(Math.random() * this.divisionFactor) + 1;
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
        let nonEquality = `${this.getNumber()}+0`;
        // while (this.isCorrect(nonEquality)) {
        let first;
        let second;
        switch (operation) {
            case '+':
            case 'x':
                second = Math.floor(Math.random() * this.number * 0.75);
                first = Math.floor(Math.random() * this.number * 0.75);
                break;
            case '-':
                first = Math.floor(Math.random() * this.number) + this.number;
                second = Math.floor(Math.random() * this.number);
                break;
            case '÷':
                second = Math.floor(Math.random() * this.divisionFactor) + 1;
                first =
                    Math.floor(Math.random() * this.number * this.number) +
                    this.number;
                break;
            default:
                second = 0;
                first = 0;
        }
        nonEquality = `${first}${operation}${second}`;
        // }
        return nonEquality;
    }

    getFiller() {
        const operation =
            this.operations[Math.floor(Math.random() * this.operations.length)];
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

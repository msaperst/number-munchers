import React from 'react';
import Multiples from '../games/Multiples';
import Factors from '../games/Factors';
import Equality from '../games/Equality';
import Primes from '../games/Primes';
import Menu from '../components/menu/Menu';
import Difficulty from './options/Difficulty';

class Play {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return 'Play Number Munchers';
    }

    // eslint-disable-next-line class-methods-use-this
    getScreen() {
        const games = [];
        const difficulty = Difficulty.getDifficulty(
            localStorage.getItem('difficulty')
        );
        if (difficulty.getMultiples().use) {
            games.push(new Multiples());
        }
        if (difficulty.getFactors().use) {
            games.push(new Factors());
        }
        if (difficulty.getEquality().use) {
            games.push(new Equality());
        }
        if (difficulty.getPrimes().use) {
            games.push(new Primes());
        }
        return (
            <Menu
                question="Which Number Munchers game would you like to play"
                options={games}
                escape={Menu.mainMenu()}
                extraClass="menu-border"
                instructions="Use Arrows to move, then press Enter"
            />
        );
    }
}

export default Play;

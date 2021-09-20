import React from 'react';
// eslint-disable-next-line import/no-cycle
import Multiples from '../games/Multiples';
// eslint-disable-next-line import/no-cycle
import Factors from '../games/Factors';
// eslint-disable-next-line import/no-cycle
import Primes from '../games/Primes';
// eslint-disable-next-line import/no-cycle
import Menu from '../components/menu/Menu';
// eslint-disable-next-line import/no-cycle
import Difficulty from './options/Difficulty';

class Play {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return 'Play Number Munchers';
    }

    // eslint-disable-next-line class-methods-use-this
    getScreen() {
        const games = [];
        if (
            Difficulty.getDifficulty(
                localStorage.getItem('difficulty')
            ).getMultiples().use
        ) {
            games.push(new Multiples());
        }
        if (
            Difficulty.getDifficulty(
                localStorage.getItem('difficulty')
            ).getFactors().use
        ) {
            games.push(new Factors());
        }
        if (
            Difficulty.getDifficulty(
                localStorage.getItem('difficulty')
            ).getPrimes().use
        ) {
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

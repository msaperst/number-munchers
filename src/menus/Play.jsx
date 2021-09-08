import React from 'react';
import Multiples from '../games/Multiples';
import Factors from '../games/Factors';
import Primes from '../games/Primes';
// eslint-disable-next-line import/no-cycle
import Menu from '../components/menu/Menu';

class Play {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return 'Play Number Munchers';
    }

    // eslint-disable-next-line class-methods-use-this
    getScreen() {
        return (
            <Menu
                question="Which Number Munchers game would you like to play"
                options={[new Multiples(), new Factors(), new Primes()]}
                instructions="Use Arrows to move, then press Enter"
            />
        );
    }
}

export default Play;

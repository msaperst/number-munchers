import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './components/menu/Menu';
import './index.css';
// import Multiples from './objects/Multiples';
// import Factors from './objects/Factors';
// import Primes from './objects/Primes';

ReactDOM.render(
    // <Menu
    //     question="Which Number Munchers game would you like to play"
    //     options={[new Multiples(), new Factors(), new Primes()]}
    //     instructions="Use Arrows to move, then press Enter"
    // />,
    <Menu
        question=""
        options={[
            'Play Number Munchers',
            'Hall of Fame',
            'Information',
            'Options',
            'Quit',
        ]}
        instructions="Use Arrows to move, then press Enter"
        background="opening"
    />,
    document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './components/menu/Menu';
import './index.css';
import Play from './menus/Play';
import Hall from './menus/Hall';
import Info from './menus/Info';
import Options from './menus/Options';
import Quit from './menus/Quit';

ReactDOM.render(
    // <Menu
    //     question="Which Number Munchers game would you like to play"
    //     options={[new Multiples(), new Factors(), new Primes()]}
    //     instructions="Use Arrows to move, then press Enter"
    // />,
    <Menu
        question=""
        options={[
            new Play(),
            new Hall(),
            new Info(),
            new Options(),
            new Quit(),
        ]}
        instructions="Use Arrows to move, then press Enter"
        background="opening"
    />,
    document.getElementById('root')
);

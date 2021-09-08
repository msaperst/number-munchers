import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './components/menu/Menu';
import './index.css';
import Play from './menus/Play';
import Hall from './menus/Hall';
import Info from './menus/Info';
import Option from './menus/Option';
import Quit from './menus/Quit';

ReactDOM.render(
    <Menu
        question=""
        options={[new Play(), new Hall(), new Info(), new Option(), new Quit()]}
        instructions="Use Arrows to move, then press Enter"
        background="opening"
    />,
    document.getElementById('root')
);

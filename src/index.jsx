import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './components/menu/Menu';
import './index.css';
import Multiples from './objects/Multiples';
import Factors from './objects/Factors';

ReactDOM.render(
    <Menu
        question="Which Number Munchers game would you like to play"
        options={[new Multiples(), new Factors()]}
        instructions="Use Arrows to move, then press Enter"
    />,
    document.getElementById('root')
);

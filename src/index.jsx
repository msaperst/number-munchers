import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game/Game';
import './index.css';
import Multiples from './objects/Multiples';

ReactDOM.render(
    <Game game={new Multiples()} />,
    document.getElementById('root')
);

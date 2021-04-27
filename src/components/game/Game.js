import React from 'react';
import './Game.css'
import Board from "../board/Board";
import {GAME_TYPES} from "../../objects/games";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 1,
            type: GAME_TYPES.MULTIPLES,
            number: '5',
        };
    }

    render() {
        let level = 'Level: ' + this.state.level;
        let title = this.state.type + ' of ' + this.state.number;

        return (
            <div>
                <div className="level">{level}</div>
                <div className="title">{title}</div>
                <Board type={this.state.type} number={this.state.number}/>
            </div>
        )
    }
}

export default Game;
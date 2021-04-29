import React from 'react';
import './Game.css'
import Board from "../board/Board";
import {GAME_TYPES} from "../../objects/games";

const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;

const WIDTH = 6;
const HEIGHT = 5;

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            level: 1,
            type: GAME_TYPES.MULTIPLES,
            number: 5,
            muncher: {x: 2, y: 2}
        };
        // eslint-disable-next-line no-func-assign
        handleDown = handleDown.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", handleDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", handleDown);
    }

    render() {
        let level = 'Level: ' + this.state.level;
        let title = this.state.type + ' of ' + this.state.number;

        return (
            <div>
                <div className="level">{level}</div>
                <div className="title">{title}</div>
                <Board height={HEIGHT} width={WIDTH} type={this.state.type} number={this.state.number}
                       muncher={this.state.muncher}/>
            </div>
        )
    }
}

function handleDown(event) {
    switch (event.keyCode) {
        case LEFT:
            this.setState({muncher: {x: Math.max(0, (this.state.muncher.x) - 1), y: this.state.muncher.y}});
            break;
        case RIGHT:
            this.setState({muncher: {x: Math.min(WIDTH - 1, (this.state.muncher.x) + 1), y: this.state.muncher.y}});
            break;
        case UP:
            this.setState({muncher: {x: this.state.muncher.x, y: Math.max(0, (this.state.muncher.y) - 1)}});
            break;
        case DOWN:
            this.setState({muncher: {x: this.state.muncher.x, y: Math.min(HEIGHT - 1, (this.state.muncher.y) + 1)}});
            break;
        default:
        //do nothing
    }
}

export default Game;
export {handleDown};
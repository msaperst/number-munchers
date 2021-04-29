import React from 'react';
import './Game.css'
import Board from "../board/Board";
import {GAME_TYPES} from "../../objects/games";
import {GetMultiple, IsMultiple} from "../../objects/Multiples";

// const ENTER = 13
const SPACE = 32;
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
            muncher: {x: 2, y: 2},
            squares: Array(WIDTH * HEIGHT).fill(null)
        };
        // eslint-disable-next-line no-func-assign
        handleDown = handleDown.bind(this);
        // eslint-disable-next-line no-func-assign
        numberFill = numberFill.bind(this);
        // eslint-disable-next-line no-func-assign
        munch = munch.bind(this);
        //setup our initial square values
        let squares = this.state.squares;
        squares.map((value, index) => (
            squares[index] = numberFill(this.state.type, this.state.number)
        ));
        this.state.squares = squares;
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
                <Board height={HEIGHT} width={WIDTH} muncher={this.state.muncher} squares={this.state.squares}/>
            </div>
        )
    }
}

function handleDown(event) {
    switch (event.keyCode) {
        case SPACE:
            munch();
            break;
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

function numberFill() {
    switch (this.state.type) {
        case GAME_TYPES.MULTIPLES:
            return GetMultiple(this.state.number);
        default:
            return '';
    }
}

function munch() {
    //get and setup our square
    let squares = this.state.squares;
    const value = squares[this.state.muncher.y * WIDTH + this.state.muncher.x];
    squares[this.state.muncher.y * WIDTH + this.state.muncher.x] = '';
    this.setState({squares: squares});

    //determine if we nommed something good
    let isValid;
    switch (this.state.type) {
        case GAME_TYPES.MULTIPLES:
            isValid = IsMultiple(this.state.number, value);
            break;
        default:
            isValid = false;
    }
    return (isValid);
}

export default Game;
export {handleDown, numberFill, munch};
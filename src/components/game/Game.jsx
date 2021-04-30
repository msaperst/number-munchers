import React from 'react';
import './Game.css';
import Board from '../board/Board';
import { GAME_TYPES } from '../../objects/games';
import { GetMultiple, IsMultiple } from '../../objects/Multiples';

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
            // eslint-disable-next-line react/no-unused-state
            level: 1,
            // eslint-disable-next-line react/no-unused-state
            type: GAME_TYPES.MULTIPLES,
            // eslint-disable-next-line react/no-unused-state
            number: 5,
            // eslint-disable-next-line react/no-unused-state
            muncher: { x: 2, y: 2 },
            squares: Array(WIDTH * HEIGHT).fill(null),
        };
        // eslint-disable-next-line no-func-assign
        handleDown = handleDown.bind(this);
        // eslint-disable-next-line no-func-assign
        numberFill = numberFill.bind(this);
        // eslint-disable-next-line no-func-assign
        munch = munch.bind(this);

        // setup our initial square values
        const { game } = this.state;
        const { squares } = game.squares;
        for (let i = 0; i < squares.length; i++) {
            squares[i] = numberFill();
        }
        this.state.squares = squares;
    }

    componentDidMount() {
        document.addEventListener('keydown', handleDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', handleDown);
    }

    render() {
        const { group } = this.state;
        const level = `Level: ${group.level}`;
        const title = `${group.type} of ${group.number}`;

        return (
            <div>
                <div className="level">{level}</div>
                <div className="title">{title}</div>
                <Board
                    height={HEIGHT}
                    width={WIDTH}
                    muncher={group.muncher}
                    squares={group.squares}
                />
            </div>
        );
    }
}

function handleDown(event) {
    switch (event.keyCode) {
        case SPACE:
            munch();
            break;
        case LEFT:
            this.setState({
                muncher: {
                    x: Math.max(0, this.state.muncher.x - 1),
                    y: this.state.muncher.y,
                },
            });
            break;
        case RIGHT:
            this.setState({
                muncher: {
                    x: Math.min(WIDTH - 1, this.state.muncher.x + 1),
                    y: this.state.muncher.y,
                },
            });
            break;
        case UP:
            this.setState({
                muncher: {
                    x: this.state.muncher.x,
                    y: Math.max(0, this.state.muncher.y - 1),
                },
            });
            break;
        case DOWN:
            this.setState({
                muncher: {
                    x: this.state.muncher.x,
                    y: Math.min(HEIGHT - 1, this.state.muncher.y + 1),
                },
            });
            break;
        default:
        // do nothing
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
    // get and setup our square
    const { squares } = this.state;
    const value = squares[this.state.muncher.y * WIDTH + this.state.muncher.x];
    squares[this.state.muncher.y * WIDTH + this.state.muncher.x] = '';
    this.setState({ squares });

    // determine if we nommed something good
    let isValid;
    switch (this.state.type) {
        case GAME_TYPES.MULTIPLES:
            isValid = IsMultiple(this.state.number, value);
            break;
        default:
            isValid = false;
    }
    return isValid;
}

export default Game;
export { handleDown, numberFill, munch };

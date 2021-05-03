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
            level: 1,
            type: GAME_TYPES.MULTIPLES,
            number: 0,
            score: 0,
            lives: 3,
            notification: '',
            muncher: { x: 2, y: 2 },
            squares: Array(WIDTH * HEIGHT),
        };
        // eslint-disable-next-line no-func-assign
        handleDown = handleDown.bind(this);
        // eslint-disable-next-line no-func-assign
        munch = munch.bind(this);
        // eslint-disable-next-line no-func-assign
        update = update.bind(this);

        const { type } = this.state;
        setupBoard(this.setBoard, type);
    }

    componentDidMount() {
        document.addEventListener('keydown', handleDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', handleDown);
    }

    setBoard = (number, squares) => {
        this.state.number = number;
        this.state.squares = squares;
    };

    render() {
        const {
            level,
            type,
            number,
            muncher,
            squares,
            score,
            lives,
            notification,
        } = this.state;

        const munchers = [];
        for (let i = 0; i < lives; i++) {
            munchers.push(
                <span key={i} className="life">
                    Mun
                </span>
            );
        }

        return (
            <div className="full">
                <div className="info">
                    <div className="level">{`Level: ${level}`}</div>
                    <div className="title">{`${type} of ${number}`}</div>
                </div>
                <Board
                    height={HEIGHT}
                    width={WIDTH}
                    muncher={muncher}
                    squares={squares}
                    notification={notification}
                />
                <div className="info">
                    <div className="score">
                        <span>Score:</span>{' '}
                        <span className="points">{score}</span>
                    </div>
                    <div className="lives">{munchers}</div>
                </div>
            </div>
        );
    }
}

function setupBoard(setBoard, type) {
    const squares = Array(WIDTH * HEIGHT);
    const number = 1 + Math.ceil(Math.random() * 9);
    for (let i = 0; i < squares.length; i++) {
        squares[i] = numberFill(type, number);
    }
    setBoard(number, squares);
}

function handleDown(event) {
    const { squares, type, number, notification } = this.state;
    if (notification === '') {
        switch (event.keyCode) {
            case SPACE:
                update(munch());
                checkLevel(squares, type, number);
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
    } else if (event.keyCode === SPACE) {
        this.setState({ notification: '' });
    }
}

function numberFill(type, number) {
    switch (type) {
        case GAME_TYPES.MULTIPLES:
            return GetMultiple(number);
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
    return { isValid, value };
}

function update(inputs) {
    const { isValid, value } = inputs;
    let { score, lives, notification } = this.state;

    if (isValid && value !== '') {
        score += 5;
        this.setState({ score });
    } else if (!isValid) {
        let compare = this.state.type.toLowerCase();
        compare = compare.slice(0, compare.length - 1);
        notification = `"${value}" is not a ${compare} of "${this.state.number}".`;
        this.setState({ notification });
        lives--;
        this.setState({ lives });
    }
}

function checkLevel(squares, type, number) {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] !== '') {
            switch (type) {
                case GAME_TYPES.MULTIPLES:
                    if (IsMultiple(number, squares[i])) {
                        return false;
                    }
                    break;
                default:
                    return false;
            }
        }
    }
    return true;
}

export default Game;
export { handleDown, numberFill, munch, update, checkLevel, setupBoard };

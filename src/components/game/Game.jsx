import React from 'react';
import './Game.css';
import Board from '../board/Board';
import { GAME_TYPES } from '../../objects/games';
import { GetMultiple, IsMultiple } from '../../objects/Multiples';

const WIDTH = 6;
const HEIGHT = 5;

class Game extends React.Component {
    constructor(props) {
        super(props);
        const type = GAME_TYPES.MULTIPLES;
        const muncher = { x: 2, y: 2 };
        const { number, squares } = setupBoard(type, muncher);
        this.state = {
            level: 1,
            type,
            number,
            score: 0,
            lives: 3,
            notification: '',
            muncher,
            squares,
        };
    }

    componentDidMount() {
        const parent = this;
        document.addEventListener('keydown', function keyed(event) {
            handleDown(
                event.code,
                parent.state,
                parent.updateBoard,
                parent.updateNotification,
                parent.moveMuncher,
                parent.updateGame,
                parent.nextLevel
            );
        });
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', handleDown);
    }

    moveMuncher = (xc, yc) => {
        const { muncher } = this.state;
        this.setState({
            muncher: {
                x: Math.min(Math.max(0, muncher.x + xc), WIDTH - 1),
                y: Math.min(Math.max(0, muncher.y + yc), HEIGHT - 1),
            },
        });
    };

    initializeGame = (number, squares) => {
        const muncher = { x: 2, y: 2 };
        this.setState({
            number,
            squares,
            muncher,
            score: 0,
            lives: 3,
            level: 1,
        });
    };

    nextLevel = (number) => {
        const { level } = this.state;
        this.setState({ level: level + 1, number });
    };

    updateBoard = (squares) => {
        this.setState({ squares });
    };

    updateNotification = (notification) => {
        this.setState({ notification });
    };

    updateGame = (score, lives) => {
        this.setState({ score, lives });
        if (lives === 0) {
            const { type } = this.state;
            this.updateNotification('You lost the game!');
            const { number, squares } = setupBoard(type, { x: 2, y: 2 });
            this.initializeGame(number, squares);
        }
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

function setupBoard(type, muncher) {
    const squares = Array(WIDTH * HEIGHT);
    const number = 1 + Math.ceil(Math.random() * 9);
    squares[muncher.y * WIDTH + muncher.x] = '';
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] !== '') {
            squares[i] = numberFill(type, number);
        }
    }
    return { number, squares };
}

function handleDown(
    code,
    state,
    updateBoard,
    updateNotification,
    moveMuncher,
    updateGame,
    nextLevel
) {
    const { squares, number, notification, type, muncher } = state;
    if (notification === '') {
        switch (code) {
            case 'Space':
                update(
                    munch(state, updateBoard),
                    state,
                    updateGame,
                    updateNotification
                );
                if (checkLevel(squares, type, number)) {
                    updateNotification('You beat the level!');
                    moveMuncher(2 - muncher.x, 2 - muncher.y);
                    const { squares, number } = setupBoard(type, {
                        x: 2,
                        y: 2,
                    });
                    updateBoard(squares);
                    nextLevel(number);
                }
                break;
            case 'ArrowLeft':
                moveMuncher(-1, 0);
                break;
            case 'ArrowRight':
                moveMuncher(1, 0);
                break;
            case 'ArrowUp':
                moveMuncher(0, -1);
                break;
            case 'ArrowDown':
                moveMuncher(0, 1);
                break;
            default:
            // do nothing
        }
    } else if (code === 'Space') {
        updateNotification('');
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

function munch(state, updateBoard) {
    // get and setup our square
    const { squares, muncher, number, type } = state;
    const value = squares[muncher.y * WIDTH + muncher.x];
    squares[muncher.y * WIDTH + muncher.x] = '';
    updateBoard(squares);

    // determine if we ate something good
    let isValid;
    switch (type) {
        case GAME_TYPES.MULTIPLES:
            isValid = IsMultiple(number, value);
            break;
        default:
            isValid = false;
    }
    return { isValid, value };
}

function update(inputs, state, updateGame, updateNotification) {
    const { isValid, value } = inputs;
    let { score, lives } = state;
    const { type, number } = state;

    if (isValid && value !== '') {
        score += 5;
    } else if (!isValid) {
        const compare = type.slice(0, type.length - 1);
        updateNotification(
            `"${value}" is not a ${compare.toLowerCase()} of "${number}".`
        );
        lives--;
    }
    updateGame(score, lives);
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

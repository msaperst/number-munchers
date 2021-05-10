import React from 'react';
import './Game.css';
import Board from '../board/Board';
import { GAME_TYPES } from '../../objects/games';
import Multiples from '../../objects/Multiples';
import Keyboard from '../keyboard/Keyboard';

const WIDTH = 6;
const HEIGHT = 5;

class Game extends React.Component {
    constructor(props) {
        super(props);
        const game = new Multiples();
        const muncher = { x: 2, y: 2 };
        this.state = {
            game,
            level: 1,
            score: 0,
            lives: 3,
            notification: '',
            muncher,
            squares: this.setupBoard(game, muncher),
        };

        this.keyDown = this.keyDown.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', (event) => {
            this.keyDown(event.code);
        });
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown);
    }

    setupBoard(game, muncher) {
        game.resetNumber();
        const squares = Array(WIDTH * HEIGHT);
        squares[muncher.y * WIDTH + muncher.x] = '';
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] !== '') {
                squares[i] = this.numberFill(game);
            }
        }
        return squares;
    }

    keyDown(code) {
        const { notification, game, muncher } = this.state;
        if (notification === '') {
            switch (code) {
                case 'Space':
                    this.update(this.munch());
                    if (this.checkLevel()) {
                        const { level } = this.state;
                        this.moveMuncher(2 - muncher.x, 2 - muncher.y);
                        this.setState({
                            notification: 'You beat the level!',
                            level: level + 1,
                            squares: this.setupBoard(game, {
                                x: 2,
                                y: 2,
                            }),
                        });
                    }
                    break;
                case 'ArrowLeft':
                    this.moveMuncher(-1, 0);
                    break;
                case 'ArrowRight':
                    this.moveMuncher(1, 0);
                    break;
                case 'ArrowUp':
                    this.moveMuncher(0, -1);
                    break;
                case 'ArrowDown':
                    this.moveMuncher(0, 1);
                    break;
                default:
                // do nothing
            }
        } else if (code === 'Space') {
            this.setState({ notification: '' });
        }
    }

    moveMuncher(xc, yc) {
        const { muncher } = this.state;
        this.setState({
            muncher: {
                x: Math.min(Math.max(0, muncher.x + xc), WIDTH - 1),
                y: Math.min(Math.max(0, muncher.y + yc), HEIGHT - 1),
            },
        });
    }

    // eslint-disable-next-line class-methods-use-this
    numberFill(game) {
        switch (game.getGame()) {
            case GAME_TYPES.MULTIPLES:
                return game.getMultiple();
            default:
                return '';
        }
    }

    munch() {
        // get and setup our square
        const { squares, muncher, game } = this.state;
        const value = squares[muncher.y * WIDTH + muncher.x];
        squares[muncher.y * WIDTH + muncher.x] = '';
        this.setState({ squares });

        // determine if we ate something good
        let isValid;
        switch (game.getGame()) {
            case GAME_TYPES.MULTIPLES:
                isValid = game.isMultiple(value);
                break;
            default:
                isValid = false;
        }
        return { isValid, value };
    }

    update(inputs) {
        const { isValid, value } = inputs;
        let { score, lives } = this.state;
        const { game } = this.state;

        if (isValid && value !== '') {
            score += 5;
        } else if (!isValid) {
            const compare = game.getGame().slice(0, game.getGame().length - 1);
            this.setState({
                notification: `"${value}" is not a ${compare.toLowerCase()} of "${game.getNumber()}".`,
            });
            lives--;
        }
        this.setState({ score, lives });
        if (lives === 0) {
            this.setState({
                squares: this.setupBoard(game, { x: 2, y: 2 }),
                muncher: { x: 2, y: 2 },
                score: 0,
                lives: 3,
                level: 1,
                notification: 'You lost the game!',
            });
        }
    }

    checkLevel() {
        const { squares, game } = this.state;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] !== '') {
                switch (game.getGame()) {
                    case GAME_TYPES.MULTIPLES:
                        if (game.isMultiple(squares[i])) {
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

    render() {
        const { level, game, muncher, squares, score, lives, notification } =
            this.state;

        const munchers = [];
        for (let i = 0; i < lives; i++) {
            munchers.push(<span key={i} className="life" />);
        }

        return (
            <div className="full">
                <div className="info">
                    <div className="level">{`Level: ${level}`}</div>
                    <div className="title">{`${game.getGame()} of ${game.getNumber()}`}</div>
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
                <Keyboard
                    up={() => this.keyDown('ArrowUp')}
                    down={() => this.keyDown('ArrowDown')}
                    left={() => this.keyDown('ArrowLeft')}
                    right={() => this.keyDown('ArrowRight')}
                    space={() => this.keyDown('Space')}
                />
            </div>
        );
    }
}

export default Game;

import React from 'react';
import './Game.css';
import Board from '../board/Board';
import Keyboard from '../keyboard/Keyboard';

const WIDTH = 6;
const HEIGHT = 5;

class Game extends React.Component {
    constructor(props) {
        super(props);
        const { game } = props;
        const muncher = { x: 2, y: 2 };
        this.state = {
            game,
            level: 1,
            score: 0,
            lives: 3,
            notification: '',
            muncher,
            troggles: [],
            squares: this.setupBoard(game, muncher),
        };

        this.keyDown = this.keyDown.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', (event) => {
            this.keyDown(event.code);
        });
        this.timer = setInterval(() => {
            this.troggle();
        }, 4000); // TODO - make this go faster based on the level
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown);
        clearInterval(this.timer);
    }

    // eslint-disable-next-line class-methods-use-this
    setupBoard(game, muncher) {
        game.resetNumber();
        const squares = Array(WIDTH * HEIGHT);
        squares[muncher.y * WIDTH + muncher.x] = '';
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] !== '') {
                squares[i] = game.getFiller();
            }
        }
        return squares;
    }

    troggle() {
        const { level, troggles } = this.state;
        const remove = [];
        // move any existing troggles
        for (let t = 0; t < troggles.length; t++) {
            const troggle = troggles[t];
            switch (troggle.direction) {
                case 'right':
                    troggle.x++;
                    break;
                case 'left':
                    troggle.x--;
                    break;
                case 'down':
                    troggle.y++;
                    break;
                case 'up':
                    troggle.y--;
                    break;
                default:
                // do nothing
            }
            // TODO - change the number after passing
            // TODO - hide the muncher on eating him
            // TODO - pause the troggle on notification
            if (
                troggle.x < 0 ||
                troggle.y < 0 ||
                troggle.x > WIDTH - 1 ||
                troggle.y > HEIGHT - 1
            ) {
                remove.push(t);
            }
        }
        // remove any needed troggles
        for (let i = 0; i < remove.length; i++) {
            troggles.splice(i, 1);
        }
        this.setState({ troggles });

        // we should consider adding a troggle if the troggle count is less than twice the level + 1
        if (troggles.length < (level + 1) / 2 && Math.random() < 0.2) {
            // TODO - first off we need a troggle alert
            let x = Math.floor(Math.random() * WIDTH);
            let y = Math.floor(Math.random() * HEIGHT);
            if (x > 0 && x < WIDTH - 1) {
                y = Math.abs(HEIGHT - 1 - y) < Math.abs(0 - y) ? HEIGHT - 1 : 0;
            }
            if (y > 0 && y < HEIGHT - 1) {
                x = Math.abs(WIDTH - 1 - x) < Math.abs(0 - x) ? WIDTH - 1 : 0;
            }
            let direction;
            if (x === 0) {
                direction = 'right';
            } else if (x === WIDTH - 1) {
                direction = 'left';
            } else if (y === 0) {
                direction = 'down';
            } else {
                direction = 'up';
            }
            troggles.push({ x, y, troggle: 'reggie', direction }); // TODO - decide which monster to deploy
            this.setState({ troggles });
        }
        this.troggleMuncherCheck();
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
        this.troggleMuncherCheck();
    }

    troggleMuncherCheck() {
        const { troggles, muncher, game } = this.state;
        let { lives } = this.state;
        // move any existing troggles
        for (let t = 0; t < troggles.length; t++) {
            const troggle = troggles[t];
            if (troggle.x === muncher.x && troggle.y === muncher.y) {
                this.setState({
                    notification: 'Yikes! You were eaten by a Troggle.', // TODO - put in proper troggle name
                });
                lives--;
                this.setState({ lives });
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
        }
    }

    munch() {
        // get and setup our square
        const { squares, muncher, game } = this.state;
        const value = squares[muncher.y * WIDTH + muncher.x];
        squares[muncher.y * WIDTH + muncher.x] = '';
        this.setState({ squares });

        // determine if we ate something good
        let isValid = true;
        if (value !== '') {
            isValid = game.isCorrect(value);
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
            this.setState({
                notification: game.getError(value),
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
                if (game.isCorrect(squares[i])) {
                    return false;
                }
            }
        }
        return true;
    }

    render() {
        const {
            level,
            game,
            muncher,
            troggles,
            squares,
            score,
            lives,
            notification,
        } = this.state;

        const munchers = [];
        for (let i = 0; i < lives; i++) {
            munchers.push(<span key={i} className="life" />);
        }

        return (
            <div className="full">
                <div className="info">
                    <div className="level">{`Level: ${level}`}</div>
                    <div className="title">{game.getTitle()}</div>
                </div>
                <Board
                    height={HEIGHT}
                    width={WIDTH}
                    troggles={troggles}
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

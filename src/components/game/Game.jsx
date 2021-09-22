import React from 'react';
import './Game.css';
import ReactDOM from 'react-dom';
import Board from '../board/Board';
import { addTroggle, moveTroggles } from '../troggle/Troggle';
import Status from '../status/Status';
import Quit from '../quit/Quit';
// eslint-disable-next-line import/no-cycle
import Menu from '../menu/Menu';

const WIDTH = 6;
const HEIGHT = 5;

class Game extends React.Component {
    constructor(props) {
        super(props);
        const { game } = props;
        const muncher = { x: 2, y: 2 };
        this.state = {
            game,
            pause: false,
            quit: false,
            level: 1,
            score: 0,
            lives: 3,
            notification: '',
            status: '',
            muncher,
            troggles: [],
            squares: this.setupBoard(game, muncher),
        };

        this.keyDown = this.keyDown.bind(this);
        this.clickedSquare = this.clickedSquare.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyDown);
        this.timer = setInterval(() => {
            this.troggle();
        }, 4000); // TODO - make this go faster based on the level/troggle
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
        const { squares, game, pause, level, troggles } = this.state;
        if (!pause) {
            // handle our troggles
            const response = addTroggle(
                moveTroggles(troggles, WIDTH, HEIGHT),
                level,
                WIDTH,
                HEIGHT
            );
            // change the numbers behind any
            for (let i = 0; i < response.troggles.length; i++) {
                const troggle = response.troggles[i];
                if (
                    troggle.position !== undefined &&
                    squares[troggle.position.y * WIDTH + troggle.position.x] !==
                        ''
                ) {
                    squares[troggle.position.y * WIDTH + troggle.position.x] =
                        game.getFiller();
                }
            }
            this.setState({
                troggles: response.troggles,
                status: response.status,
                squares,
            });
            this.troggleMuncherCheck();
        }
    }

    keyDown(e) {
        const { pause, quit, game, muncher } = this.state;
        if (!pause) {
            switch (e.code) {
                case 'Space':
                    this.update(this.munch());
                    if (this.checkLevel()) {
                        const { level } = this.state;
                        this.moveMuncher(2 - muncher.x, 2 - muncher.y);
                        this.setState({
                            pause: true,
                            notification: 'You beat the level!',
                            level: level + 1,
                            troggles: [],
                            status: '',
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
                case 'Escape':
                    this.setState({ quit: true, pause: true });
                    break;
                default:
                // do nothing
            }
        } else if (e.code === 'Space' && !quit) {
            this.setState({ pause: false, notification: '' });
        } else if (e.code === 'Escape') {
            this.setState({ quit: false, pause: false });
        }
    }

    clickedSquare(x, y) {
        const { muncher, pause } = this.state;
        if (pause) {
            return;
        }
        if (x === muncher.x && y === muncher.y) {
            // eat this number
            this.keyDown({ code: 'Space' });
        } else {
            // move to the square
            const xc = Math.max(Math.min(x - muncher.x, 1), -1); // move left if lower, right if higher, not at all if same
            const yc = Math.max(Math.min(y - muncher.y, 1), -1); // move up if lower, down if higher, not at all if same
            this.timerX = setInterval(() => {
                // move on the x-axis
                this.moveMuncher(xc, 0);
                const { muncher } = this.state;
                if (x === muncher.x) {
                    clearInterval(this.timerX);
                }
            }, 200);
            setTimeout(() => {
                // move on the y-axis
                this.timerY = setInterval(() => {
                    this.moveMuncher(0, yc);
                    const { muncher } = this.state;
                    if (y === muncher.y) {
                        clearInterval(this.timerY);
                    }
                }, 200);
            }, 100);
        }
    }

    moveMuncher(xc, yc) {
        // TODO - need to figure out how to animate this
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
        const { troggles, muncher } = this.state;
        let { lives } = this.state;
        for (let t = 0; t < troggles.length; t++) {
            const troggle = troggles[t];
            if (
                troggle.position !== undefined &&
                troggle.position.x === muncher.x &&
                troggle.position.y === muncher.y
            ) {
                lives--;
                muncher.display = 'none';
                clearInterval(this.timerX);
                clearInterval(this.timerY);
                this.setState({
                    pause: true,
                    notification: `Yikes! You were eaten by a Trogglus ${troggle.troggle}.`,
                    lives,
                    muncher,
                });
                this.endGame();
                break;
            } else {
                muncher.display = '';
                this.setState({ muncher });
            }
        }
    }

    endGame() {
        const { lives, game } = this.state;
        if (lives === 0) {
            this.setState({
                squares: this.setupBoard(game, { x: 2, y: 2 }),
                muncher: { x: 2, y: 2 },
                score: 0,
                lives: 3,
                level: 1,
                pause: true,
                notification: 'You lost the game!',
                troggles: [],
                status: '',
            });
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
                pause: true,
                notification: game.getError(value),
            });
            lives--;
        }
        this.setState({ score, lives });
        this.endGame();
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
            quit,
            muncher,
            troggles,
            squares,
            score,
            lives,
            notification,
            status,
        } = this.state;

        const munchers = [];
        for (let i = 0; i < lives; i++) {
            munchers.push(<span key={i} className="life" />);
        }

        let quitMenu;
        if (quit) {
            quitMenu = (
                <Quit
                    no={() => this.keyDown({ code: 'Escape' })}
                    yes={() =>
                        // eslint-disable-next-line react/no-render-return-value
                        ReactDOM.render(
                            Menu.mainMenu(),
                            document.getElementById('root')
                        )
                    }
                />
            );
        }

        return (
            <div className="full">
                {quitMenu}
                <div className="info">
                    <div className="level">{`Level: ${level}`}</div>
                    <div className="title">{game.getTitle()}</div>
                </div>
                <Status status={status} />
                <Board
                    height={HEIGHT}
                    width={WIDTH}
                    troggles={troggles}
                    muncher={muncher}
                    squares={squares}
                    notification={notification}
                    movement={{
                        keyDown: this.keyDown,
                        click: (x, y) => this.clickedSquare(x, y),
                    }}
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

export default Game;

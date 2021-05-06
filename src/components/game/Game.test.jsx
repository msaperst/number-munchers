import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Game, {
    checkLevel,
    handleDown,
    munch,
    numberFill,
    setupBoard,
    update,
} from './Game';
import { GAME_TYPES } from '../../objects/games';

Enzyme.configure({ adapter: new Adapter() });

describe('<Game/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = Enzyme.shallow(<Game />);
        wrapper.setState({ number: 5 });
    });

    const doNothing = () => {};

    const setBoard = (number, squares) => {
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(10);
        expect(squares).toHaveLength(30);
        for (let i = 0; i < squares.length; i++) {
            expect(squares[i]).toBeGreaterThanOrEqual(0);
            expect(squares[i]).toBeLessThanOrEqual(number * 10);
        }
    };

    it('level 1 Displayed', () => {
        expect(wrapper.find('.level').text()).toEqual('Level: 1');
    });

    it('activity Displayed', () => {
        expect(wrapper.state().number).toEqual(5);
        expect(wrapper.find('.title').text()).toEqual('Multiples of 5');
    });

    it('score Displayed', () => {
        expect(wrapper.find('.score').text()).toEqual('Score: 0');
    });

    it('lives Displayed', () => {
        expect(wrapper.find('.lives').text()).toEqual('');
        expect(wrapper.find('.lives').find('.life')).toHaveLength(3);
    });

    it('basic Muncher Position', () => {
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 2 });
    });

    it('basic game setup', () => {
        expect(wrapper.state().score).toEqual(0);
        expect(wrapper.state().lives).toEqual(3);
    });

    it('move Muncher Other', () => {
        const event = new KeyboardEvent('keydown', { code: 'L' });
        document.dispatchEvent(event);
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 2 });
    });

    it('moves the muncher', () => {
        wrapper.instance().moveMuncher(-1, 1);
        expect(wrapper.state().muncher).toEqual({ x: 1, y: 3 });
    });

    it('maxes out the muncher', () => {
        wrapper.instance().moveMuncher(99, 99);
        expect(wrapper.state().muncher).toEqual({ x: 5, y: 4 });
    });

    it('mins out the muncher', () => {
        wrapper.instance().moveMuncher(-99, -99);
        expect(wrapper.state().muncher).toEqual({ x: 0, y: 0 });
    });

    it('initializes a board', () => {
        const squares = Array(30).fill(3);
        wrapper.instance().initializeGame(5, squares);
        expect(wrapper.state().number).toEqual(5);
        expect(wrapper.state().squares).toEqual(squares);
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 2 });
        expect(wrapper.state().score).toEqual(0);
        expect(wrapper.state().lives).toEqual(3);
        expect(wrapper.state().level).toEqual(1);
    });

    it('ups the level', () => {
        wrapper.instance().nextLevel(-1);
        expect(wrapper.state().level).toEqual(2);
        expect(wrapper.state().number).toEqual(-1);
    });

    it('updates the squares', () => {
        const squares = Array(30).fill(3);
        wrapper.instance().updateBoard(squares);
        expect(wrapper.state().squares).toEqual(squares);
    });

    it('updates the notification', () => {
        wrapper.instance().updateNotification('hello world');
        expect(wrapper.state().notification).toEqual('hello world');
    });

    it('updates the basic game details', () => {
        wrapper.instance().updateGame(10, 4);
        expect(wrapper.state().score).toEqual(10);
        expect(wrapper.state().lives).toEqual(4);
    });

    it('resets the game', () => {
        const { squares, number } = wrapper.state();
        wrapper.instance().updateGame(10, 0);
        expect(wrapper.state().notification).toEqual('You lost the game!');
        expect(wrapper.state().number).not.toEqual(number);
        expect(wrapper.state().squares).not.toEqual(squares);
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 2 });
        expect(wrapper.state().score).toEqual(0);
        expect(wrapper.state().lives).toEqual(3);
        expect(wrapper.state().level).toEqual(1);
    });

    it('full Board', () => {
        const square = render(<Game />);
        expect(square.container.querySelector('.muncher')).toBeInTheDocument();
        for (let x = 0; x < 30; x++) {
            expect(
                square.container.querySelector(`#c${x}`)
            ).toBeInTheDocument();
        }
        expect(square.container.querySelector('#c30')).not.toBeInTheDocument();
    });

    it('is all empty needs new board', () => {
        const squares = Array(2).fill('');
        expect(checkLevel(squares)).toEqual(true);
    });

    it('bad type returns false', () => {
        const squares = Array(2).fill('');
        squares[1] = 6;
        expect(checkLevel(squares, '', 5)).toEqual(false);
    });

    it('has one good value does not need new board', () => {
        const squares = Array(2).fill('');
        squares[1] = 5;
        expect(checkLevel(squares, GAME_TYPES.MULTIPLES, 5)).toEqual(false);
    });

    it('has one bad value does need new board', () => {
        const squares = Array(2).fill('');
        squares[1] = 6;
        expect(checkLevel(squares, GAME_TYPES.MULTIPLES, 5)).toEqual(true);
    });

    it('full board does not need new board', () => {
        const squares = Array(30);
        for (let i = 0; i < squares.length; i++) {
            squares[i] = numberFill(GAME_TYPES.MULTIPLES, 5);
        }
        expect(checkLevel(squares, GAME_TYPES.MULTIPLES, 5)).toEqual(false);
    });

    it('able to setup a new board', () => {
        setupBoard(0, setBoard, GAME_TYPES.MULTIPLES);
        // assertions in setBoard, this assertion just to please editor
        expect(true).toEqual(true);
    });

    it('moves Muncher to the right', () => {
        const moveMuncher = (xc, yc) => {
            expect(xc).toEqual(1);
            expect(yc).toBeLessThanOrEqual(0);
        };
        handleDown(
            'ArrowRight',
            {
                squares: Array(30),
                number: 5,
                notification: '',
                type: GAME_TYPES.MULTIPLES,
            },
            null,
            null,
            moveMuncher
        );
    });

    it('moves Muncher to the left', () => {
        const moveMuncher = (xc, yc) => {
            expect(xc).toEqual(-1);
            expect(yc).toBeLessThanOrEqual(0);
        };
        handleDown(
            'ArrowLeft',
            {
                squares: Array(30),
                number: 5,
                notification: '',
                type: GAME_TYPES.MULTIPLES,
            },
            null,
            null,
            moveMuncher
        );
    });

    it('moves Muncher to the top', () => {
        const moveMuncher = (xc, yc) => {
            expect(xc).toEqual(0);
            expect(yc).toBeLessThanOrEqual(-1);
        };
        handleDown(
            'ArrowUp',
            {
                squares: Array(30),
                number: 5,
                notification: '',
                type: GAME_TYPES.MULTIPLES,
            },
            null,
            null,
            moveMuncher
        );
    });

    it('moves Muncher to the bottom', () => {
        const moveMuncher = (xc, yc) => {
            expect(xc).toEqual(0);
            expect(yc).toBeLessThanOrEqual(1);
        };
        handleDown(
            'ArrowDown',
            {
                squares: Array(30),
                number: 5,
                notification: '',
                type: GAME_TYPES.MULTIPLES,
            },
            null,
            null,
            moveMuncher
        );
    });

    it('does nothing', () => {
        const moveMuncher = () => {
            expect(true).toEqual(false);
        };
        handleDown(
            'ArrowLeft',
            {
                squares: Array(30),
                number: 5,
                notification: '123',
                type: GAME_TYPES.MULTIPLES,
            },
            null,
            null,
            moveMuncher
        );
    });

    it('removes the notification', () => {
        const updateNotification = (notification) => {
            expect(notification).toEqual('');
        };
        handleDown(
            'Space',
            {
                squares: Array(30),
                number: 5,
                notification: '123',
                type: GAME_TYPES.MULTIPLES,
            },
            null,
            updateNotification,
            null
        );
    });

    it('adds the level win notification', () => {
        const updateNotification = (notification) => {
            expect(notification).toEqual('You beat the level!');
        };
        handleDown(
            'Space',
            {
                squares: Array(30).fill(''),
                number: 5,
                muncher: { x: 2, y: 2 },
                notification: '',
                type: GAME_TYPES.MULTIPLES,
            },
            doNothing,
            updateNotification,
            doNothing,
            doNothing,
            doNothing
        );
    });

    it('properly calculates new muncher position', () => {
        const moveMuncher = (x, y) => {
            expect(x).toEqual(1);
            expect(y).toEqual(-3);
        };
        handleDown(
            'Space',
            {
                squares: Array(30).fill(''),
                number: 5,
                muncher: { x: 1, y: 5 },
                notification: '',
                type: GAME_TYPES.MULTIPLES,
            },
            doNothing,
            doNothing,
            moveMuncher,
            doNothing,
            doNothing
        );
    });

    it('properly sets up the next level', () => {
        const nextLevel = (number) => {
            expect(number).not.toEqual(5);
        };
        handleDown(
            'Space',
            {
                squares: Array(30).fill(''),
                number: 5,
                muncher: { x: 1, y: 5 },
                notification: '',
                type: GAME_TYPES.MULTIPLES,
            },
            doNothing,
            doNothing,
            doNothing,
            doNothing,
            nextLevel
        );
    });

    it('does not present a new notification', () => {
        const updateNotification = () => {
            expect(true).toEqual(false);
        };
        handleDown(
            'Space',
            {
                squares: Array(30).fill(5),
                number: 5,
                muncher: { x: 2, y: 2 },
                notification: '',
                type: GAME_TYPES.MULTIPLES,
            },
            doNothing,
            updateNotification,
            null,
            doNothing
        );
        expect(true).toEqual(true);
    });

    it('moves Muncher Right', () => {
        const event = new KeyboardEvent('keydown', { code: 'ArrowRight' });
        document.dispatchEvent(event);
        expect(wrapper.state().muncher).toEqual({ x: 3, y: 2 });
        document.dispatchEvent(event);
        expect(wrapper.state().muncher).toEqual({ x: 4, y: 2 });
        document.dispatchEvent(event);
        expect(wrapper.state().muncher).toEqual({ x: 5, y: 2 });
        document.dispatchEvent(event);
        expect(wrapper.state().muncher).toEqual({ x: 5, y: 2 });
    });

    it('moves Muncher left', () => {
        const event = new KeyboardEvent('keydown', { code: 'ArrowLeft' });
        document.dispatchEvent(event);
        expect(wrapper.state().muncher).toEqual({ x: 1, y: 2 });
        document.dispatchEvent(event);
        expect(wrapper.state().muncher).toEqual({ x: 0, y: 2 });
        document.dispatchEvent(event);
        expect(wrapper.state().muncher).toEqual({ x: 0, y: 2 });
    });

    it('moves Muncher up', () => {
        const event = new KeyboardEvent('keydown', { code: 'ArrowUp' });
        document.dispatchEvent(event);
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 1 });
        document.dispatchEvent(event);
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 0 });
        document.dispatchEvent(event);
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 0 });
    });

    it('moves Muncher down', () => {
        const event = new KeyboardEvent('keydown', { code: 'ArrowDown' });
        document.dispatchEvent(event);
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 3 });
        document.dispatchEvent(event);
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 4 });
        document.dispatchEvent(event);
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 4 });
    });

    it('multiplier for Number Filler', () => {
        expect(numberFill(GAME_TYPES.MULTIPLES, 0)).toEqual(0);
    });

    it('returns empty', () => {
        expect(numberFill('', 5)).toEqual('');
    });

    it('not valid', () => {
        const setBoard = (squares) => {
            for (let i = 0; i < squares.length; i++) {
                if (i !== 14) {
                    expect(squares[i]).toEqual(5);
                }
            }
            expect(squares[14]).toEqual('');
        };
        const state = {
            squares: Array(30).fill(5),
            muncher: { x: 2, y: 2 },
            number: 0,
            type: GAME_TYPES.MULTIPLES,
        };
        const result = munch(state, setBoard);
        expect(result.isValid).toEqual(false);
        expect(result.value).toEqual(5);
    });

    it('is valid', () => {
        const setBoard = (squares) => {
            for (let i = 0; i < squares.length; i++) {
                if (i !== 14) {
                    expect(squares[i]).toEqual(5);
                }
            }
            expect(squares[14]).toEqual('');
        };
        const state = {
            squares: Array(30).fill(5),
            muncher: { x: 2, y: 2 },
            number: 5,
            type: GAME_TYPES.MULTIPLES,
        };
        const result = munch(state, setBoard);
        expect(result.isValid).toEqual(true);
        expect(result.value).toEqual(5);
    });

    it('is not valid for bad type', () => {
        const setBoard = (squares) => {
            for (let i = 0; i < squares.length; i++) {
                if (i !== 14) {
                    expect(squares[i]).toEqual(5);
                }
            }
            expect(squares[14]).toEqual('');
        };
        const state = {
            squares: Array(30).fill(5),
            muncher: { x: 2, y: 2 },
            number: 5,
            type: '',
        };
        const result = munch(state, setBoard);
        expect(result.isValid).toEqual(false);
        expect(result.value).toEqual(5);
    });

    it('adds score if valid and not empty', () => {
        const updateGame = (score, lives) => {
            expect(score).toEqual(5);
            expect(lives).toEqual(3);
        };
        const inputs = { isValid: true, value: 5 };
        const state = { score: 0, lives: 3, type: '', number: 5 };
        update(inputs, state, updateGame, null);
    });

    it('does nothing if valid and empty', () => {
        const updateGame = (score, lives) => {
            expect(score).toEqual(0);
            expect(lives).toEqual(3);
        };
        const inputs = { isValid: true, value: '' };
        const state = { score: 0, lives: 3, type: '', number: 5 };
        update(inputs, state, updateGame, null);
    });

    it('loses life and add notification if not valid', () => {
        const updateGame = (score, lives) => {
            expect(score).toEqual(0);
            expect(lives).toEqual(2);
        };
        const updateNotification = (notification) => {
            expect(notification).toEqual('"4" is not a multiple of "5".');
        };
        const inputs = { isValid: false, value: '4' };
        const state = {
            score: 0,
            lives: 3,
            type: GAME_TYPES.MULTIPLES,
            number: 5,
        };
        update(inputs, state, updateGame, updateNotification);
    });
});

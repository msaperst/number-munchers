import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Game, { checkLevel, handleDown, numberFill, setupBoard } from './Game';
import { GAME_TYPES } from '../../objects/games';

Enzyme.configure({ adapter: new Adapter() });

describe('<Game/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = Enzyme.shallow(<Game />);
        wrapper.setState({ number: 5 });
    });

    it('level 1 Displayed', () => {
        expect(wrapper.find('.level').text()).toEqual('Level: 1');
    });

    it('activity Displayed', () => {
        expect(wrapper.state().number).toEqual(5);
        expect(wrapper.find('.title').text()).toEqual('Multiples of 5');
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
        setupBoard(setBoard, GAME_TYPES.MULTIPLES);
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
                squares: Array(30),
                number: 5,
                notification: '',
                type: GAME_TYPES.MULTIPLES,
            },
            setBoard,
            updateNotification,
            null
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
                notification: '',
                type: GAME_TYPES.MULTIPLES,
            },
            null,
            updateNotification,
            null
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

    const setBoard = (number, squares) => {
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(10);
        expect(squares).toHaveLength(30);
        for (let i = 0; i < squares.length; i++) {
            expect(squares[i]).toBeGreaterThanOrEqual(0);
            expect(squares[i]).toBeLessThanOrEqual(number * 10);
        }
    };
});

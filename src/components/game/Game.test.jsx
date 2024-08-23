import React from 'react';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import Game from './Game';
import Multiples from '../../games/Multiples';

describe('<Game/>', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        // const dom = new JSDOM();
        document.body.innerHTML = '';
        localStorage.setItem('difficulty', 2);
    });

    it('displays level 1', () => {
        render(<Game game={new Multiples()} />);
        const level = screen.getByText('Level: ', { exact: false });
        expect(level).toHaveTextContent('Level: 1');
    });

    it('displays the activity', () => {
        render(<Game game={new Multiples()} />);
        const title = screen.getByText('Multiples of', { exact: false });
        expect(title).toBeTruthy();
        expect(title).toHaveTextContent(/Multiples of \d+/);
    });

    it('displays the score', () => {
        render(<Game game={new Multiples()} />);
        const score = screen.getByText('Score:', { exact: false });
        expect(score.parentNode).toHaveTextContent('Score: 0');
    });

    it('displays lives', () => {
        const { container } = render(<Game game={new Multiples()} />);
        expect(container.getElementsByClassName('lives')[0]).toHaveTextContent('');
        expect(container.getElementsByClassName('life')).toHaveLength(3);
    });

    it('does nothing when a random key is pressed', () => {
        const spyKey = jest.spyOn(Game.prototype, 'keyDown')
        const spyState = jest.spyOn(Game.prototype, 'setState')
        const spyMove = jest.spyOn(Game.prototype, 'moveMuncher');
        render(<Game game={new Multiples()} />);
        fireEvent.keyDown(document, {key: 'L', code: 'KeyL'});
        const keyboard = new KeyboardEvent('keyDown', {key: 'L', code: 'KeyL'});
        expect(spyKey).toHaveBeenCalledWith(keyboard);
        expect(spyState).not.toHaveBeenCalled();
        expect(spyMove).not.toHaveBeenCalled();
    });

    it('moves the Muncher up when the up arrow is pressed', () => {
        const spyState = jest.spyOn(Game.prototype, 'setState')
        const spyMove = jest.spyOn(Game.prototype, 'moveMuncher');
        render(<Game game={new Multiples()} />);
        fireEvent.keyDown(document, {key: 'Up', code: 'ArrowUp'});
        expect(spyState).toHaveBeenCalledWith({"muncher": {"x": 2, "y": 1}});
        expect(spyMove).toHaveBeenCalledWith(0, -1);
    });

    it('moves the Muncher right when the right arrow is pressed', () => {
        const spyState = jest.spyOn(Game.prototype, 'setState')
        const spyMove = jest.spyOn(Game.prototype, 'moveMuncher');
        render(<Game game={new Multiples()} />);
        fireEvent.keyDown(document, {key: 'Right', code: 'ArrowRight'});
        expect(spyState).toHaveBeenCalledWith({"muncher": {"x": 3, "y": 2}});
        expect(spyMove).toHaveBeenCalledWith(1, 0);
    });

    it('moves the Muncher down when the down arrow is pressed', () => {
        const spyState = jest.spyOn(Game.prototype, 'setState')
        const spyMove = jest.spyOn(Game.prototype, 'moveMuncher');
        render(<Game game={new Multiples()} />);
        fireEvent.keyDown(document, {key: 'Down', code: 'ArrowDown'});
        expect(spyState).toHaveBeenCalledWith({"muncher": {"x": 2, "y": 3}});
        expect(spyMove).toHaveBeenCalledWith(0, 1);
    });

    it('moves the Muncher left when the left arrow is pressed', () => {
        const spyState = jest.spyOn(Game.prototype, 'setState')
        const spyMove = jest.spyOn(Game.prototype, 'moveMuncher');
        render(<Game game={new Multiples()} />);
        fireEvent.keyDown(document, {key: 'Left', code: 'ArrowLeft'});
        expect(spyState).toHaveBeenCalledWith({"muncher": {"x": 1, "y": 2}});
        expect(spyMove).toHaveBeenCalledWith(-1, 0);
    });

    it('pauses the game when enter is pressed', () => {
        const spyState = jest.spyOn(Game.prototype, 'setState')
        const spyMove = jest.spyOn(Game.prototype, 'moveMuncher');
        render(<Game game={new Multiples()} />);
        fireEvent.keyDown(document, {key: 'Enter', code: 'Enter'});
        expect(spyState).toHaveBeenCalledWith({pause: true, status: 'Time out'});
        expect(spyMove).not.toHaveBeenCalled();
    });

    it('does not move the Muncher when the app is paused', () => {
        const spyMove = jest.spyOn(Game.prototype, 'moveMuncher');
        render(<Game game={new Multiples()} />);
        fireEvent.keyDown(document, {key: 'Enter', code: 'Enter'});
        fireEvent.keyDown(document, {key: 'Down', code: 'ArrowDown'});
        expect(spyMove).not.toHaveBeenCalled();
    });

    it('unpauses when enter is pressed', () => {
        const spyState = jest.spyOn(Game.prototype, 'setState')
        render(<Game game={new Multiples()} />);
        fireEvent.keyDown(document, {key: 'Enter', code: 'Enter'});
        fireEvent.keyDown(document, {key: 'Enter', code: 'Enter'});
        expect(spyState).lastCalledWith({pause: false, status: ''});
    });

    it('tries to quit the game when esc is pressed', () => {
        const spyState = jest.spyOn(Game.prototype, 'setState')
        const spyMove = jest.spyOn(Game.prototype, 'moveMuncher');
        render(<Game game={new Multiples()} />);
        fireEvent.keyDown(document, {key: 'Esc', code: 'Escape'});
        expect(spyState).toHaveBeenCalledWith({pause: true, quit: true});
        expect(spyMove).not.toHaveBeenCalled();
    });

    it('undoes the quit when esc is pressed', () => {
        const spyState = jest.spyOn(Game.prototype, 'setState')
        render(<Game game={new Multiples()} />);
        fireEvent.keyDown(document, {key: 'Esc', code: 'Escape'});
        fireEvent.keyDown(document, {key: 'Esc', code: 'Escape'});
        expect(spyState).toHaveBeenCalledTimes(6);
        expect(spyState).toHaveBeenNthCalledWith(5, {quit: false});
        expect(spyState).lastCalledWith({pause: false});
    });

    it('tries to quit when the game is paused', () => {
        const spyState = jest.spyOn(Game.prototype, 'setState')
        render(<Game game={new Multiples()} />);
        fireEvent.keyDown(document, {key: 'Enter', code: 'Enter'});
        fireEvent.keyDown(document, {key: 'Esc', code: 'Escape'});
        expect(spyState).lastCalledWith({quit: true});
    });

    it('undoes the quit when the game is paused but does not undo the pause', () => {
        const spyState = jest.spyOn(Game.prototype, 'setState')
        render(<Game game={new Multiples()} />);
        fireEvent.keyDown(document, {key: 'Enter', code: 'Enter'});
        fireEvent.keyDown(document, {key: 'Esc', code: 'Escape'});
        fireEvent.keyDown(document, {key: 'Esc', code: 'Escape'});
        expect(spyState).lastCalledWith({quit: false});
    });

    it('does not let the muncher go above the screen', () => {
        const spyState = jest.spyOn(Game.prototype, 'setState')
        render(<Game game={new Multiples()} />);
        fireEvent.keyDown(document, {key: 'Up', code: 'ArrowUp'});
        fireEvent.keyDown(document, {key: 'Up', code: 'ArrowUp'});
        fireEvent.keyDown(document, {key: 'Up', code: 'ArrowUp'});
        fireEvent.keyDown(document, {key: 'Up', code: 'ArrowUp'});
        fireEvent.keyDown(document, {key: 'Up', code: 'ArrowUp'});
        expect(spyState).lastCalledWith({"muncher": {"x": 2, "y": 0}})
    });

    it('does not let the muncher go right of the screen', () => {
        const spyState = jest.spyOn(Game.prototype, 'setState')
        render(<Game game={new Multiples()} />);
        fireEvent.keyDown(document, {key: 'Right', code: 'ArrowRight'});
        fireEvent.keyDown(document, {key: 'Right', code: 'ArrowRight'});
        fireEvent.keyDown(document, {key: 'Right', code: 'ArrowRight'});
        fireEvent.keyDown(document, {key: 'Right', code: 'ArrowRight'});
        fireEvent.keyDown(document, {key: 'Right', code: 'ArrowRight'});
        expect(spyState).lastCalledWith({"muncher": {"x": 5, "y": 2}})
    });

    it('does not let the muncher go below the screen', () => {
        const spyState = jest.spyOn(Game.prototype, 'setState')
        render(<Game game={new Multiples()} />);
        fireEvent.keyDown(document, {key: 'Down', code: 'ArrowDown'});
        fireEvent.keyDown(document, {key: 'Down', code: 'ArrowDown'});
        fireEvent.keyDown(document, {key: 'Down', code: 'ArrowDown'});
        fireEvent.keyDown(document, {key: 'Down', code: 'ArrowDown'});
        fireEvent.keyDown(document, {key: 'Down', code: 'ArrowDown'});
        expect(spyState).lastCalledWith({"muncher": {"x": 2, "y": 4}})
    });

    it('does not let the muncher go left of the screen', () => {
        const spyState = jest.spyOn(Game.prototype, 'setState')
        render(<Game game={new Multiples()} />);
        fireEvent.keyDown(document, {key: 'Left', code: 'ArrowLeft'});
        fireEvent.keyDown(document, {key: 'Left', code: 'ArrowLeft'});
        fireEvent.keyDown(document, {key: 'Left', code: 'ArrowLeft'});
        fireEvent.keyDown(document, {key: 'Left', code: 'ArrowLeft'});
        fireEvent.keyDown(document, {key: 'Left', code: 'ArrowLeft'});
        expect(spyState).lastCalledWith({"muncher": {"x": 0, "y": 2}})
    });

    /* TODO:
       - board setup
       - troggles
       - clicking
       - a lot more :(
     */

    /*
    xit('has the correct initial Muncher position', () => {
        render(<Game game={new Multiples()} />);
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 2 });
    });

    it('emulates a space when muncher equals coordinates', () => {
        wrapper.instance().keyDown = jest.fn();
        wrapper.update();
        wrapper.instance().clickedSquare(2, 2);
        expect(wrapper.instance().keyDown).toBeCalledWith({ code: 'Space' });
    });

    it('does not emulate a space when muncher does not equal x coordinate', () => {
        wrapper.instance().keyDown = jest.fn();
        wrapper.update();
        wrapper.instance().clickedSquare(1, 2);
        expect(wrapper.instance().keyDown).toBeCalledTimes(0);
    });

    it('does not emulate a space when muncher does not equal y coordinate', () => {
        wrapper.instance().keyDown = jest.fn();
        wrapper.update();
        wrapper.instance().clickedSquare(2, 1);
        expect(wrapper.instance().keyDown).toBeCalledTimes(0);
    });

    it('moves the muncher up to the square when clicking', () => {
        jest.useFakeTimers();
        const shallow = Enzyme.shallow(<Game game={new Multiples()} />);
        shallow.instance().componentDidMount = jest.fn();
        shallow.update();
        shallow.instance().clickedSquare(2, 0);
        expect(shallow.state().muncher.x).toEqual(2);
        expect(shallow.state().muncher.y).toEqual(2);
        act(() => jest.runOnlyPendingTimers());
        expect(shallow.state().muncher.x).toEqual(2);
        expect(shallow.state().muncher.y).toEqual(2);
        act(() => jest.runOnlyPendingTimers());
        expect(shallow.state().muncher.x).toEqual(2);
        expect(shallow.state().muncher.y).toEqual(1);
        act(() => jest.runOnlyPendingTimers());
        expect(shallow.state().muncher.x).toEqual(2);
        expect(shallow.state().muncher.y).toEqual(0);
        act(() => jest.runOnlyPendingTimers());
        expect(shallow.state().muncher.x).toEqual(2);
        expect(shallow.state().muncher.y).toEqual(0);
    });

    it('moves the muncher right to the square when clicking', () => {
        jest.useFakeTimers();
        const shallow = Enzyme.shallow(<Game game={new Multiples()} />);
        shallow.instance().componentDidMount = jest.fn();
        shallow.update();
        shallow.instance().clickedSquare(4, 2);
        expect(shallow.state().muncher.x).toEqual(2);
        expect(shallow.state().muncher.y).toEqual(2);
        act(() => jest.runOnlyPendingTimers());
        expect(shallow.state().muncher.x).toEqual(3);
        expect(shallow.state().muncher.y).toEqual(2);
        act(() => jest.runOnlyPendingTimers());
        expect(shallow.state().muncher.x).toEqual(4);
        expect(shallow.state().muncher.y).toEqual(2);
        act(() => jest.runOnlyPendingTimers());
        expect(shallow.state().muncher.x).toEqual(4);
        expect(shallow.state().muncher.y).toEqual(2);
    });

    it('moves the muncher down and left to the square when clicking', () => {
        jest.useFakeTimers();
        const shallow = Enzyme.shallow(<Game game={new Multiples()} />);
        shallow.instance().componentDidMount = jest.fn();
        shallow.update();
        shallow.instance().clickedSquare(1, 4);
        expect(shallow.state().muncher.x).toEqual(2);
        expect(shallow.state().muncher.y).toEqual(2);
        act(() => jest.runOnlyPendingTimers());
        expect(shallow.state().muncher.x).toEqual(1);
        expect(shallow.state().muncher.y).toEqual(2);
        act(() => jest.runOnlyPendingTimers());
        expect(shallow.state().muncher.x).toEqual(1);
        expect(shallow.state().muncher.y).toEqual(3);
        act(() => jest.runOnlyPendingTimers());
        expect(shallow.state().muncher.x).toEqual(1);
        expect(shallow.state().muncher.y).toEqual(4);
        act(() => jest.runOnlyPendingTimers());
        expect(shallow.state().muncher.x).toEqual(1);
        expect(shallow.state().muncher.y).toEqual(4);
    });
*/


    it('full Board', () => {
        const square = render(<Game game={new Multiples()} />);
        expect(square.container.querySelector('.muncher')).toBeInTheDocument();
        for (let x = 0; x < 30; x++) {
            expect(
                square.container.querySelector(`#c${x}`)
            ).toBeInTheDocument();
        }
        expect(square.container.querySelector('#c30')).not.toBeInTheDocument();
    });

    /*
    it('is all empty needs new board', () => {
        wrapper.state().squares = Array(2).fill('');
        expect(wrapper.instance().checkLevel()).toBeTruthy();
    });

    function assertCheckLevelMatches(game, value) {
        const squares = Array(2).fill('');
        squares[1] = value;
        wrapper.state().game = game;
        wrapper.state().squares = squares;
        expect(wrapper.instance().checkLevel()).toBeFalsy();
    }

    // eslint-disable-next-line jest/expect-expect
    it('multiples has one good value does not need new board', () => {
        const game = new Multiples();
        assertCheckLevelMatches(game, game.getNumber());
    });

    // eslint-disable-next-line jest/expect-expect
    it('factors has one good value does not need new board', () => {
        const game = new Factors();
        assertCheckLevelMatches(game, game.getNumber());
    });

    // eslint-disable-next-line jest/expect-expect
    it('primes has one good value does not need new board', () => {
        const game = new Primes();
        assertCheckLevelMatches(game, 2);
    });

    function assertCheckLevelNotMatches(game) {
        const squares = Array(2).fill('');
        squares[1] = 97;
        wrapper.state().game = game;
        wrapper.state().squares = squares;
        expect(wrapper.instance().checkLevel()).toBeTruthy();
    }

    // eslint-disable-next-line jest/expect-expect
    it('multiples has one bad value does need new board', () => {
        const game = new Multiples();
        assertCheckLevelNotMatches(game);
    });

    // eslint-disable-next-line jest/expect-expect
    it('factors has one bad value does need new board', () => {
        const game = new Factors();
        assertCheckLevelNotMatches(game);
    });

    // eslint-disable-next-line jest/expect-expect
    it('primes has one bad value does need new board', () => {
        const game = new Primes();
        assertCheckLevelNotMatches(game);
    });

    it('full board does not need new board', () => {
        expect(wrapper.instance().checkLevel()).toBeFalsy();
    });

    it('able to setup a new board', () => {
        const oldSquares = wrapper.instance().squares;
        const squares = wrapper
            .instance()
            .setupBoard(new Multiples(), { x: 2, y: 2 });
        expect(squares).toHaveLength(30);
        expect(squares).not.toEqual(oldSquares);
    });

    it('new board resets the number', () => {
        const oldNumber = wrapper.state().game.getNumber();
        wrapper.instance().setupBoard(wrapper.state().game, { x: 2, y: 2 });
        expect(wrapper.state().game.getNumber()).not.toEqual(oldNumber);
    });

    it('adds the level win notification', () => {
        wrapper.state().squares = Array(30).fill('');
        wrapper.instance().keyDown({ code: 'Space' });
        expect(wrapper.state().notification).toEqual('You beat the level!');
        expect(wrapper.state().pause).toBeTruthy();
    });

    it('properly calculates new level', () => {
        wrapper.state().level = 2;
        wrapper.state().squares = Array(30).fill('');
        wrapper.instance().keyDown({ code: 'Space' });
        expect(wrapper.state().level).toEqual(3);
    });

    it('properly resets the troggles', () => {
        wrapper.state().troggles = [1, 3, 4];
        wrapper.state().squares = Array(30).fill('');
        wrapper.instance().keyDown({ code: 'Space' });
        expect(wrapper.state().troggles).toEqual([]);
    });

    it('properly calculates new muncher position', () => {
        wrapper.state().muncher.x = 0;
        wrapper.state().muncher.y = 0;
        wrapper.state().squares = Array(30).fill('');
        wrapper.instance().keyDown({ code: 'Space' });
        expect(wrapper.state().muncher.x).toEqual(2);
        expect(wrapper.state().muncher.y).toEqual(2);
    });

    it('properly sets up the next level', () => {
        const originalNumber = wrapper.state().game.getNumber();
        wrapper.state().squares = Array(30).fill('');
        wrapper.instance().keyDown({ code: 'Space' });
        expect(wrapper.state().game.getNumber()).not.toEqual(originalNumber);
    });

    function assertMunchNotValid(wrapper) {
        const squares = Array(30).fill(5);
        squares[14] = 97;
        // eslint-disable-next-line no-param-reassign
        wrapper.state().squares = squares;
        const result = wrapper.instance().munch();
        expect(result.isValid).toBeFalsy();
        expect(result.value).toEqual(97);
        for (let i = 0; i < squares.length; i++) {
            if (i !== 14) {
                expect(squares[i]).toEqual(5);
            }
        }
        expect(squares[14]).toEqual('');
    }

    // eslint-disable-next-line jest/expect-expect
    it('multiples not valid', () => {
        const wrapper = Enzyme.shallow(<Game game={new Multiples()} />);
        assertMunchNotValid(wrapper);
    });

    // eslint-disable-next-line jest/expect-expect
    it('factors not valid', () => {
        const wrapper = Enzyme.shallow(<Game game={new Factors()} />);
        assertMunchNotValid(wrapper);
    });

    // eslint-disable-next-line jest/expect-expect
    it('primes not valid', () => {
        const wrapper = Enzyme.shallow(<Game game={new Primes()} />);
        assertMunchNotValid(wrapper);
    });

    it('is valid for empty', () => {
        const wrapper = Enzyme.shallow(<Game game={new Factors()} />);
        const squares = Array(30).fill(5);
        squares[14] = '';
        wrapper.state().squares = squares;
        const result = wrapper.instance().munch();
        expect(result.isValid).toBeTruthy();
        expect(result.value).toEqual('');
        for (let i = 0; i < squares.length; i++) {
            if (i !== 14) {
                expect(squares[i]).toEqual(5);
            }
        }
        expect(squares[14]).toEqual('');
    });

    it('is valid', () => {
        const squares = Array(30).fill(5);
        squares[14] = 0;
        wrapper.state().squares = squares;
        const result = wrapper.instance().munch();
        expect(result.isValid).toBeTruthy();
        expect(result.value).toEqual(0);
        for (let i = 0; i < squares.length; i++) {
            if (i !== 14) {
                expect(squares[i]).toEqual(5);
            }
        }
        expect(squares[14]).toEqual('');
    });

    it('adds score if valid and not empty', () => {
        const inputs = { isValid: true, value: 0 };
        wrapper.instance().update(inputs);
        expect(wrapper.state().score).toEqual(5);
        expect(wrapper.state().lives).toEqual(3);
    });

    it('does nothing if valid and empty', () => {
        const inputs = { isValid: true, value: '' };
        wrapper.instance().update(inputs);
        expect(wrapper.state().score).toEqual(0);
        expect(wrapper.state().lives).toEqual(3);
    });

    it('loses life and add notification if not valid', () => {
        const inputs = { isValid: false, value: '4' };
        wrapper.instance().update(inputs);
        expect(wrapper.state().notification).toEqual(
            `"4" is not a multiple of "${wrapper.state().game.getNumber()}".`
        );
        expect(wrapper.state().score).toEqual(0);
        expect(wrapper.state().lives).toEqual(2);
    });

    it('resets the game if lives drop to 0', () => {
        const oldSquares = wrapper.state().squares;
        const inputs = { isValid: false, value: '4' };
        wrapper.state().lives = 1;
        wrapper.state().level = 3;
        wrapper.state().score = 10;
        wrapper.state().muncher = 10;
        wrapper.state().troggles = [1, 3];
        wrapper.state().status = 'some status';
        wrapper.instance().update(inputs);
        expect(wrapper.state().squares).toHaveLength(30);
        expect(wrapper.state().squares).not.toEqual(oldSquares);
        expect(wrapper.state().score).toEqual(0);
        expect(wrapper.state().lives).toEqual(3);
        expect(wrapper.state().level).toEqual(1);
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 2 });
        expect(wrapper.state().notification).toEqual('You lost the game!');
        expect(wrapper.state().troggles).toEqual([]);
        expect(wrapper.state().status).toEqual('');
    });

    it('changes nothing when no troggles moved', () => {
        const oldSquares = wrapper.state().squares;
        wrapper.state().notification = '';
        wrapper.state().troggles = [
            {
                troggle: 'happy',
            },
        ];
        wrapper.instance().troggle();
        expect(wrapper.state().squares).toEqual(oldSquares);
    });

    it('changes nothing when troggle is on blank space', () => {
        wrapper.state().squares = Array(30).fill('');
        wrapper.state().notification = '';
        wrapper.state().troggles = [
            {
                position: { x: 3, y: 2 },
                troggle: 'happy',
                direction: { x: 0, y: 1 },
            },
        ];
        wrapper.instance().troggle();
        expect(wrapper.state().squares).toEqual(Array(30).fill(''));
    });

    it('changes a number as a troggle moves past', () => {
        wrapper.state().squares = Array(30).fill('1');
        wrapper.state().notification = '';
        wrapper.state().troggles = [
            {
                position: { x: 3, y: 2 },
                troggle: 'happy',
                direction: { x: 0, y: 1 },
            },
        ];
        wrapper.instance().troggle();
        expect(wrapper.state().squares[21]).not.toEqual('1');
    });

    it('no troggles does not munch anything', () => {
        wrapper.state().notification = '';
        wrapper.state().lives = 2;
        wrapper.state().muncher = 2;
        wrapper.state().troggles = [];
        wrapper.instance().troggleMuncherCheck();
        expect(wrapper.state().notification).toEqual('');
        expect(wrapper.state().lives).toEqual(2);
        expect(wrapper.state().muncher).toEqual(2);
        expect(wrapper.state().troggles).toEqual([]);
    });

    it('just sets the display with an empty troggle', () => {
        wrapper.state().notification = '';
        wrapper.state().lives = 2;
        wrapper.state().muncher = { x: 2, y: 2 };
        wrapper.state().troggles = [{}];
        wrapper.instance().troggleMuncherCheck();
        expect(wrapper.state().notification).toEqual('');
        expect(wrapper.state().lives).toEqual(2);
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 2, display: '' });
        expect(wrapper.state().troggles).toEqual([{}]);
    });

    it('just sets the display with a non matching (y) muncher and troggle', () => {
        wrapper.state().notification = '';
        wrapper.state().lives = 2;
        wrapper.state().muncher = { x: 2, y: 2 };
        wrapper.state().troggles = [{ position: { x: 2, y: 3 } }];
        wrapper.instance().troggleMuncherCheck();
        expect(wrapper.state().notification).toEqual('');
        expect(wrapper.state().lives).toEqual(2);
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 2, display: '' });
        expect(wrapper.state().troggles).toEqual([
            { position: { x: 2, y: 3 } },
        ]);
    });

    it('just sets the display with a non matching (x) muncher and troggle', () => {
        wrapper.state().notification = '';
        wrapper.state().lives = 2;
        wrapper.state().muncher = { x: 2, y: 2 };
        wrapper.state().troggles = [{ position: { x: 3, y: 2 } }];
        wrapper.instance().troggleMuncherCheck();
        expect(wrapper.state().notification).toEqual('');
        expect(wrapper.state().lives).toEqual(2);
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 2, display: '' });
        expect(wrapper.state().troggles).toEqual([
            { position: { x: 3, y: 2 } },
        ]);
    });

    it('sets the state with matching muncher and troggle', () => {
        wrapper.state().notification = '';
        wrapper.state().lives = 2;
        wrapper.state().muncher = { x: 2, y: 2 };
        wrapper.state().troggles = [
            { position: { x: 2, y: 2 }, troggle: 'happy' },
        ];
        wrapper.instance().troggleMuncherCheck();
        expect(wrapper.state().notification).toEqual(
            'Yikes! You were eaten by a Trogglus happy.'
        );
        expect(wrapper.state().lives).toEqual(1);
        expect(wrapper.state().muncher).toEqual({
            x: 2,
            y: 2,
            display: 'none',
        });
        expect(wrapper.state().troggles).toEqual([
            { position: { x: 2, y: 2 }, troggle: 'happy' },
        ]);
    });

    it('does not reset when more lives exist', () => {
        const oldSquares = wrapper.state().squares;
        wrapper.state().lives = 1;
        wrapper.state().level = 3;
        wrapper.state().score = 10;
        wrapper.state().muncher = 10;
        wrapper.state().troggles = [1, 3];
        wrapper.state().status = 'some status';
        wrapper.instance().endGame();
        expect(wrapper.state().squares).toHaveLength(30);
        expect(wrapper.state().squares).toEqual(oldSquares);
        expect(wrapper.state().score).toEqual(10);
        expect(wrapper.state().lives).toEqual(1);
        expect(wrapper.state().level).toEqual(3);
        expect(wrapper.state().muncher).toEqual(10);
        expect(wrapper.state().notification).toEqual('');
        expect(wrapper.state().troggles).toEqual([1, 3]);
        expect(wrapper.state().status).toEqual('some status');
    });

    it('does reset when more lives exist', () => {
        const oldSquares = wrapper.state().squares;
        wrapper.state().lives = 0;
        wrapper.state().level = 3;
        wrapper.state().score = 10;
        wrapper.state().muncher = 10;
        wrapper.state().troggles = [1, 3];
        wrapper.state().status = 'some status';
        wrapper.instance().endGame();
        expect(wrapper.state().squares).toHaveLength(30);
        expect(wrapper.state().squares).not.toEqual(oldSquares);
        expect(wrapper.state().score).toEqual(0);
        expect(wrapper.state().lives).toEqual(3);
        expect(wrapper.state().level).toEqual(1);
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 2 });
        expect(wrapper.state().notification).toEqual('You lost the game!');
        expect(wrapper.state().troggles).toEqual([]);
        expect(wrapper.state().status).toEqual('');
    });

    it('calls troggle on appropriate timing', () => {
        jest.useFakeTimers();
        const mount = Enzyme.mount(<Game game={new Multiples()} />);
        const spy = jest.spyOn(mount.instance(), 'troggle');
        expect(spy).toBeCalledTimes(0);
        act(() => jest.runOnlyPendingTimers());
        expect(spy).toBeCalledTimes(1);
    });

    xit('recognizes clicking on a square', () => {
        jest.useFakeTimers();
        const mount = Enzyme.mount(<Game game={new Multiples()} />);
        mount.instance().componentDidMount = jest.fn();
        mount.update();
        mount.find('#c25').simulate('click');
        // just run through a bunch of timers (troggle timer means we can be precise with how many)
        // exact timing of movement was tested elsewhere
        let count = 0;
        while (mount.state().muncher.x !== 1 && count < 100000) {
            act(() => jest.runOnlyPendingTimers());
            count++;
        }
        expect(mount.state().muncher.x).toEqual(1);
        while (mount.state().muncher.y !== 4 && count < 200000) {
            act(() => jest.runOnlyPendingTimers());
            count++;
        }
        expect(mount.state().muncher.y).toEqual(4);
    });
    */
});

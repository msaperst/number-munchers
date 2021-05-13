import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Game from './Game';
import Multiples from '../../objects/Multiples';
import Factors from '../../objects/Factors';
import Primes from '../../objects/Primes';

Enzyme.configure({ adapter: new Adapter() });

describe('<Game/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = Enzyme.shallow(<Game game={new Multiples()} />);
    });

    it('level 1 Displayed', () => {
        expect(wrapper.find('.level').text()).toEqual('Level: 1');
    });

    it('activity Displayed', () => {
        expect(wrapper.find('.title').text()).toEqual(
            `Multiples of ${wrapper.state().game.getNumber()}`
        );
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

    it('is all empty needs new board', () => {
        wrapper.state().squares = Array(2).fill('');
        expect(wrapper.instance().checkLevel()).toEqual(true);
    });

    it('bad type returns false', () => {
        const multiples = new Multiples();
        jest.spyOn(multiples, 'getGame').mockImplementation(() => 'Foo');
        wrapper.state().game = multiples;
        wrapper.state().squares = Array(2).fill(5);
        expect(wrapper.instance().checkLevel()).toEqual(false);
    });

    function assertCheckLevelMatches(game, value) {
        const squares = Array(2).fill('');
        squares[1] = value;
        wrapper.state().game = game;
        wrapper.state().squares = squares;
        expect(wrapper.instance().checkLevel()).toEqual(false);
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
        expect(wrapper.instance().checkLevel()).toEqual(true);
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
        expect(wrapper.instance().checkLevel()).toEqual(false);
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

    it('moves Muncher to the right', () => {
        wrapper.instance().keyDown('ArrowRight');
        expect(wrapper.state().muncher.x).toEqual(3);
        expect(wrapper.state().muncher.y).toEqual(2);
    });

    it('moves Muncher to the left', () => {
        wrapper.instance().keyDown('ArrowLeft');
        expect(wrapper.state().muncher.x).toEqual(1);
        expect(wrapper.state().muncher.y).toEqual(2);
    });

    it('moves Muncher to the top', () => {
        wrapper.instance().keyDown('ArrowUp');
        expect(wrapper.state().muncher.x).toEqual(2);
        expect(wrapper.state().muncher.y).toEqual(1);
    });

    it('moves Muncher to the bottom', () => {
        wrapper.instance().keyDown('ArrowDown');
        expect(wrapper.state().muncher.x).toEqual(2);
        expect(wrapper.state().muncher.y).toEqual(3);
    });

    it('does nothing', () => {
        wrapper.state().notification = '123';
        wrapper.instance().keyDown('ArrowRight');
        expect(wrapper.state().muncher.x).toEqual(2);
        expect(wrapper.state().muncher.y).toEqual(2);
    });

    it('removes the notification', () => {
        wrapper.state().notification = '123';
        wrapper.instance().keyDown('Space');
        expect(wrapper.state().muncher.x).toEqual(2);
        expect(wrapper.state().muncher.y).toEqual(2);
        expect(wrapper.state().notification).toEqual('');
    });

    it('adds the level win notification', () => {
        wrapper.state().squares = Array(30).fill('');
        wrapper.instance().keyDown('Space');
        expect(wrapper.state().notification).toEqual('You beat the level!');
    });

    it('properly calculates new muncher position', () => {
        wrapper.state().muncher.x = 0;
        wrapper.state().muncher.y = 0;
        wrapper.state().squares = Array(30).fill('');
        wrapper.instance().keyDown('Space');
        expect(wrapper.state().muncher.x).toEqual(2);
        expect(wrapper.state().muncher.y).toEqual(2);
    });

    it('properly sets up the next level', () => {
        const originalNumber = wrapper.state().game.getNumber();
        wrapper.state().squares = Array(30).fill('');
        wrapper.instance().keyDown('Space');
        expect(wrapper.state().game.getNumber()).not.toEqual(originalNumber);
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

    it('returns a valid multiple', () => {
        expect(
            wrapper.instance().numberFill(new Multiples())
        ).toBeLessThanOrEqual(25);
    });

    it('returns a valid factor', () => {
        expect(
            wrapper.instance().numberFill(new Factors())
        ).toBeLessThanOrEqual(25);
    });

    it('returns a valid prime', () => {
        expect(wrapper.instance().numberFill(new Primes())).toBeLessThanOrEqual(
            7
        );
    });

    it('returns empty', () => {
        const multiples = new Multiples();
        jest.spyOn(multiples, 'getGame').mockImplementation(() => 'Foo');
        expect(wrapper.instance().numberFill(multiples)).toEqual('');
    });

    function assertMunchNotValid(wrapper) {
        const squares = Array(30).fill(5);
        squares[14] = 97;
        // eslint-disable-next-line no-param-reassign
        wrapper.state().squares = squares;
        const result = wrapper.instance().munch();
        expect(result.isValid).toEqual(false);
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
        expect(result.isValid).toEqual(true);
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
        expect(result.isValid).toEqual(true);
        expect(result.value).toEqual(0);
        for (let i = 0; i < squares.length; i++) {
            if (i !== 14) {
                expect(squares[i]).toEqual(5);
            }
        }
        expect(squares[14]).toEqual('');
    });

    it('is not valid for bad type', () => {
        const multiples = new Multiples();
        jest.spyOn(multiples, 'getGame').mockImplementation(() => 'Foo');
        wrapper.state().game = multiples;
        const squares = Array(30).fill(5);
        wrapper.state().squares = squares;
        const result = wrapper.instance().munch();
        expect(result.isValid).toEqual(false);
        expect(result.value).toEqual(5);
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
        wrapper.instance().update(inputs);
        expect(wrapper.state().squares).toHaveLength(30);
        expect(wrapper.state().squares).not.toEqual(oldSquares);
        expect(wrapper.state().score).toEqual(0);
        expect(wrapper.state().lives).toEqual(3);
        expect(wrapper.state().level).toEqual(1);
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 2 });
        expect(wrapper.state().notification).toEqual('You lost the game!');
    });
});

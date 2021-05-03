import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Game, { checkLevel, numberFill, setupBoard } from './Game';
import { GAME_TYPES } from "../../objects/games";

Enzyme.configure({ adapter: new Adapter() });

describe('<Game/>', () => {
    let wrapper;
    let events;

    beforeEach(() => {
        events = {};
        document.addEventListener = jest.fn((event, cb) => {
            events[event] = cb;
        });
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

    it('move Muncher Other', () => {
        events.keydown({ keyCode: 30 });
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
        const setBoard = (number, squares) => {
            expect(number).toBeGreaterThanOrEqual(1);
            expect(number).toBeLessThanOrEqual(10);
            expect(squares.length).toEqual(30);
            for (let i = 0; i < squares.length; i++) {
                expect(squares[i]).toBeGreaterThanOrEqual(0);
                expect(squares[i]).toBeLessThanOrEqual(number*10);
            }
        };
        setupBoard(setBoard, GAME_TYPES.MULTIPLES);
    });
});

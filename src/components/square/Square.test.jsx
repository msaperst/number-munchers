import React from 'react';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import Square from './Square';
import Game from "../game/Game";
import Multiples from "../../games/Multiples";

describe('<Square/>', () => {
    it('empty Square', () => {
        const square = render(<Square />);
        expect(square.container.querySelector('#c0')).toEqual(null);
    });

    it('get Bad Value', () => {
        const square = render(<Square cell="0" />);
        expect(square.container.querySelector('#c0').textContent).toEqual('');
    });

    it('get Good Value', () => {
        const square = render(<Square cell="0" value="5" />);
        expect(square.container.querySelector('#c0').textContent).toEqual('5');
    });

    it('returns the method when clicked', () => {
        const stub = jest.fn();
        const { container } = render(
            <Square cell="0" value="5" onClick={() => stub(1)} />
        );
        fireEvent.click(container.getElementsByClassName('square')[0]);
        expect(stub).toHaveBeenCalledWith(1);
    });
});

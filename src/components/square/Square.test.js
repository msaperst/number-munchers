import Square from "./Square";
import '@testing-library/jest-dom';
import {queryByAttribute, render, screen} from "@testing-library/react";
import {GAME_TYPES} from "../../objects/games";

test('Empty Square', () => {
    const square = render(<Square/>);
    expect(square.container.querySelector('#c0')).toEqual(null)
});

test('Get Bad Value', () => {
    const square = render(<Square cell='0' type="123"/>);
    expect(square.container.querySelector('#c0').textContent).toEqual('')
});

test('Get Good Value', () => {
    const square = render(<Square cell='0' type={GAME_TYPES.MULTIPLES} number="0"/>);
    expect(square.container.querySelector('#c0').textContent).toEqual('0')
});
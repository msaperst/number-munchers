import Board, {getRow, getRows} from './Board.js'
import '@testing-library/jest-dom';
import {render} from "@testing-library/react";

test('Get Small Row', () => {
    const row = getRow(1, 0);
    expect(row.length).toEqual(1);
    const square = render(row[0]);
    expect(square.container.querySelector('#c0')).toBeInTheDocument();
});

test('Get First Row', () => {
    const row = getRow(3, 0);
    expect(row.length).toEqual(3);
    let square = render(row[0]);
    expect(square.container.querySelector('#c0')).toBeInTheDocument();
    square = render(row[1]);
    expect(square.container.querySelector('#c1')).toBeInTheDocument();
    square = render(row[2]);
    expect(square.container.querySelector('#c2')).toBeInTheDocument();
});

test('Get Second Row', () => {
    const row = getRow(3, 1);
    expect(row.length).toEqual(3);
    let square = render(row[0]);
    expect(square.container.querySelector('#c3')).toBeInTheDocument();
    square = render(row[1]);
    expect(square.container.querySelector('#c4')).toBeInTheDocument();
    square = render(row[2]);
    expect(square.container.querySelector('#c5')).toBeInTheDocument();
});

test('Get Small Board', () => {
    const row = getRows(1, 1);
    expect(row.length).toEqual(1);
    let square = render(row[0]);
    expect(square.container.querySelector('#c0')).toBeInTheDocument();
    expect(square.container.querySelector('#c1')).not.toBeInTheDocument();
});

test('Get Medium Board', () => {
    const row = getRows(3, 3);
    expect(row.length).toEqual(3);
    let square = render(row[0]);
    expect(square.container.querySelector('#c0')).toBeInTheDocument();
    expect(square.container.querySelector('#c1')).toBeInTheDocument();
    expect(square.container.querySelector('#c2')).toBeInTheDocument();
    expect(square.container.querySelector('#c3')).not.toBeInTheDocument();
    square = render(row[1]);
    expect(square.container.querySelector('#c3')).toBeInTheDocument();
    expect(square.container.querySelector('#c4')).toBeInTheDocument();
    expect(square.container.querySelector('#c5')).toBeInTheDocument();
    expect(square.container.querySelector('#c6')).not.toBeInTheDocument();
    square = render(row[2]);
    expect(square.container.querySelector('#c6')).toBeInTheDocument();
    expect(square.container.querySelector('#c7')).toBeInTheDocument();
    expect(square.container.querySelector('#c8')).toBeInTheDocument();
    expect(square.container.querySelector('#c9')).not.toBeInTheDocument();
});

test('Full Board', () => {
    let square = render(<Board muncher={{x: 0, y: 0}} height="5" width="6"/>);
    expect(square.container.querySelector('.muncher')).toBeInTheDocument();
    expect(square.container.querySelector('.muncher').getBoundingClientRect().left).toEqual(0);
    expect(square.container.querySelector('.muncher').getBoundingClientRect().top).toEqual(0);
    for (let x = 0; x < 30; x++) {
        expect(square.container.querySelector('#c' + x)).toBeInTheDocument();
    }
    expect(square.container.querySelector('#c30')).not.toBeInTheDocument();
});


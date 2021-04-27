import Board, {getRow,getRows} from './Board.js'
import '@testing-library/jest-dom';
import {render,screen} from "@testing-library/react";

test('Get Small Row', () => {
    const row = getRow(1,0);
    expect(row.length).toEqual(1);
    render(row[0]);
    expect(screen.queryByText(/0/)).toBeInTheDocument();
});

test('Get First Row', () => {
    const row = getRow(3,0);
    expect(row.length).toEqual(3);
    render(row[0]);
    expect(screen.queryByText(/0/)).toBeInTheDocument();
    render(row[1]);
    expect(screen.queryByText(/1/)).toBeInTheDocument();
    render(row[2]);
    expect(screen.queryByText(/2/)).toBeInTheDocument();
});

test('Get Second Row', () => {
    const row = getRow(3,1);
    expect(row.length).toEqual(3);
    render(row[0]);
    expect(screen.queryByText(/3/)).toBeInTheDocument();
    render(row[1]);
    expect(screen.queryByText(/4/)).toBeInTheDocument();
    render(row[2]);
    expect(screen.queryByText(/5/)).toBeInTheDocument();
});

test('Get Small Board', () => {
    const row = getRows(1,1);
    expect(row.length).toEqual(1);
    render(row[0]);
    expect(screen.queryByText(/0/)).toBeInTheDocument();
    expect(screen.queryByText(/1/)).not.toBeInTheDocument();
});

test('Get Medium Board', () => {
    const row = getRows(3,3);
    expect(row.length).toEqual(3);
    render(row[0]);
    expect(screen.queryByText(/0/)).toBeInTheDocument();
    expect(screen.queryByText(/1/)).toBeInTheDocument();
    expect(screen.queryByText(/2/)).toBeInTheDocument();
    expect(screen.queryByText(/3/)).not.toBeInTheDocument();
    render(row[1]);
    expect(screen.queryByText(/3/)).toBeInTheDocument();
    expect(screen.queryByText(/4/)).toBeInTheDocument();
    expect(screen.queryByText(/5/)).toBeInTheDocument();
    expect(screen.queryByText(/6/)).not.toBeInTheDocument();
    render(row[2]);
    expect(screen.queryByText(/6/)).toBeInTheDocument();
    expect(screen.queryByText(/7/)).toBeInTheDocument();
    expect(screen.queryByText(/8/)).toBeInTheDocument();
    expect(screen.queryByText(/9/)).not.toBeInTheDocument();
});

test('Full Board', () => {
    render(<Board/>);
    for(let x = 0; x < 30; x++) {
        expect(screen.queryByText(x)).toBeInTheDocument();
    }
    expect(screen.queryByText(/30/)).not.toBeInTheDocument();
});


import Square from "./Square";
import '@testing-library/jest-dom';
import {render,screen} from "@testing-library/react";

test('Empty Square', () => {
    render(<Square/>);
    expect(screen.queryByText(/0/)).toEqual(null);
});

test('Basic Square', () => {
    render(<Square value={0}/>);
    expect(screen.queryByText(/0/)).toBeInTheDocument();
});
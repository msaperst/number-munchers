import '@testing-library/jest-dom';
import {render,screen} from "@testing-library/react";
import Game from "./Game";

test('Level 1 Displayed', () => {
    render(<Game/>)
    expect(screen.queryByText(/Level: 1/)).toBeInTheDocument();
});

test('Activity Displayed', () => {
    render(<Game/>)
    expect(screen.queryByText(/Multiples of 5/)).toBeInTheDocument();
});
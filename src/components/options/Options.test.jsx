import React from 'react';
import Options from './Options';
import Multiples from '../../games/Multiples';
import Factors from '../../games/Factors';
import Primes from '../../games/Primes';
import {fireEvent, render, screen} from "@testing-library/react";

describe('<Option/>', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    it('displays all the options', () => {
        render(<Options
            options={[new Multiples(), new Factors(), new Primes()]}
        />);
        const list = screen.getAllByRole('listitem');
        expect(list).toHaveLength(3);
        expect(list[0].innerHTML).toBe('Multiples');
        expect(list[1].innerHTML).toBe('Factors');
        expect(list[2].innerHTML).toBe('Primes');
    });

    it('displays the second option', () => {
        render(<Options
            options={[new Multiples(), new Factors(), new Primes()]}
            selected={1}
        />);
        const list = screen.getAllByRole('listitem');
        expect(list[1].classList).toContain('selected');
        expect(list[0].classList).not.toContain('selected');
        expect(list[2].classList).not.toContain('selected');
    });

    it('returns the element when clicking the element', () => {
        const stub = jest.fn();
        render(<Options
            options={[new Multiples(), new Factors(), new Primes()]}
            selected={0}
            onClick={(option) => stub(option)}
        />);
        const list = screen.getAllByRole('listitem');
        fireEvent.click(list[2]);
        expect(stub).toHaveBeenCalledWith(2);
    });

    it('returns the element when pressing the element', () => {
        const stub = jest.fn();
        render(<Options
            options={[new Multiples(), new Factors(), new Primes()]}
            selected={0}
            onClick={(option) => stub(option)}
        />);
        const list = screen.getAllByRole('listitem');
        fireEvent.keyPress(list[1]);
        expect(stub).toHaveBeenCalledWith(1);
    });

    it('returns the element when clicking the selected element', () => {
        const stub = jest.fn();
        render(<Options
            options={[new Multiples(), new Factors(), new Primes()]}
            selected={0}
            onClick={(option) => stub(option)}
        />);
        const list = screen.getAllByRole('listitem');
        fireEvent.click(list[0]);
        expect(stub).toHaveBeenCalledWith(0);
    });

    it('returns the element when pressing the selected element', () => {
        const stub = jest.fn();
        render(<Options
            options={[new Multiples(), new Factors(), new Primes()]}
            selected={0}
            onClick={(option) => stub(option)}
        />);
        const list = screen.getAllByRole('listitem');
        fireEvent.keyPress(list[0]);
        expect(stub).toHaveBeenCalledWith(0);
    });
});

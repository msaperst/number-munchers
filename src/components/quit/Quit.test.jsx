import React from 'react';
import Quit from './Quit';
import {render, screen} from "@testing-library/react";

describe('<Quit/>', () => {
    it('displays options', () => {
        render(<Quit />);
        const quit = screen.getByText('Do you really want to quit?');
        expect(quit).toBeTruthy();
        expect(quit.querySelectorAll('.quit-button')).toHaveLength(2);
    });

    it('has the second option selected', () => {
        render(<Quit/>);
        const quit = screen.getByText('Do you really want to quit?');
        const buttons = quit.querySelectorAll('.quit-button');
        expect(buttons[0].classList).not.toContain('quit-selected');
        expect(buttons[1].classList).toContain('quit-selected');
    });

    it('selects the first element on select 0', () => {
        wrapper.instance().select(0);
        expect(wrapper.state().selected).toEqual(0);
    });

    it('selects the second element on select 1', () => {
        wrapper.instance().select(0);
        wrapper.instance().select(1);
        expect(wrapper.state().selected).toEqual(1);
    });

    it('executes the yes command when selecting yes', () => {
        const yes = () => {
            expect(true).toBeTruthy();
        };
        const no = () => {
            expect(true).toBeFalsy();
        };
        const wrapper = Enzyme.mount(
            <Quit yes={() => yes()} no={() => no()} />
        );
        wrapper.state().selected = 0;
        wrapper.instance().select(0);
    });

    it('executes the no command when selecting no', () => {
        const yes = () => {
            expect(true).toBeFalsy();
        };
        const no = () => {
            expect(true).toBeTruthy();
        };
        const wrapper = Enzyme.mount(
            <Quit yes={() => yes()} no={() => no()} />
        );
        wrapper.instance().select(1);
    });

    it('does nothing when up is pressed', () => {
        wrapper.instance().keyDown({ code: 'ArrowUp' });
        expect(wrapper.state().selected).toEqual(1);
    });

    it('selects the first element when left is pressed', () => {
        wrapper.instance().keyDown({ code: 'ArrowLeft' });
        expect(wrapper.state().selected).toEqual(0);
    });

    it('selects the first element when left is pressed twice', () => {
        wrapper.instance().keyDown({ code: 'ArrowLeft' });
        wrapper.instance().keyDown({ code: 'ArrowLeft' });
        expect(wrapper.state().selected).toEqual(0);
    });

    it('selects the second element when right is pressed', () => {
        wrapper.instance().keyDown({ code: 'ArrowRight' });
        expect(wrapper.state().selected).toEqual(1);
    });

    it('selects the second element when left then right is pressed', () => {
        wrapper.instance().keyDown({ code: 'ArrowLeft' });
        wrapper.instance().keyDown({ code: 'ArrowRight' });
        expect(wrapper.state().selected).toEqual(1);
    });

    it('executes the yes command when pressing enter on yes', () => {
        const yes = () => {
            expect(true).toBeTruthy();
        };
        const no = () => {
            expect(true).toBeFalsy();
        };
        const wrapper = Enzyme.mount(
            <Quit yes={() => yes()} no={() => no()} />
        );
        wrapper.state().selected = 0;
        wrapper.instance().keyDown({ code: 'Enter' });
    });

    it('executes the no command when pressing enter on no', () => {
        const yes = () => {
            expect(true).toBeFalsy();
        };
        const no = () => {
            expect(true).toBeTruthy();
        };
        const wrapper = Enzyme.mount(
            <Quit yes={() => yes()} no={() => no()} />
        );
        wrapper.instance().keyDown({ code: 'Enter' });
    });

    it('selects yes when clicking on yes', () => {
        wrapper.instance().select = jest.fn();
        wrapper.update();
        wrapper.find('.quit-yes').simulate('click');
        expect(wrapper.instance().select).toBeCalledWith(0);
    });

    it('selects yes when pressing on yes', () => {
        wrapper.instance().select = jest.fn();
        wrapper.update();
        wrapper.find('.quit-yes').simulate('keypress');
        expect(wrapper.instance().select).toBeCalledWith(0);
    });

    it('selects no when clicking on no', () => {
        wrapper.instance().select = jest.fn();
        wrapper.update();
        wrapper.find('.quit-no').simulate('click');
        expect(wrapper.instance().select).toBeCalledWith(1);
    });

    it('selects no when pressing on no', () => {
        wrapper.instance().select = jest.fn();
        wrapper.update();
        wrapper.find('.quit-no').simulate('keypress');
        expect(wrapper.instance().select).toBeCalledWith(1);
    });
});

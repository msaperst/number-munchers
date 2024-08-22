import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';
import React from 'react';
import Quit from './Quit';

Enzyme.configure({ adapter: new Adapter() });

describe('<Quit/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = Enzyme.mount(<Quit />);
    });

    it('displays options', () => {
        expect(wrapper.find('.quit').text()).toEqual(
            'Do you really want to quit?YesNo'
        );
        expect(wrapper.find('.quit').find('.quit-button')).toHaveLength(2);
    });

    it('has the second option selected', () => {
        expect(
            wrapper
                .find('.quit')
                .find('.quit-button')
                .at(1)
                .hasClass('quit-selected')
        ).toBeTruthy();
    });

    it('has other options not selected', () => {
        expect(
            wrapper
                .find('.quit')
                .find('.quit-button')
                .at(0)
                .hasClass('quit-selected')
        ).toBeFalsy();
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

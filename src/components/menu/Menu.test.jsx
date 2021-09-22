import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render } from '@testing-library/react';
import Menu from './Menu';
import Multiples from '../../games/Multiples';
import Factors from '../../games/Factors';
import Primes from '../../games/Primes';

Enzyme.configure({ adapter: new Adapter() });

describe('<Menu/>', () => {
    let wrapper;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();

        wrapper = Enzyme.mount(
            <Menu
                question="foo"
                options={[new Multiples(), new Factors(), new Primes()]}
                instructions="bar"
            />
        );
    });

    it('basic load', () => {
        render(<Menu question="foo" options={[]} instructions="bar" />);
        expect(wrapper.find('.text').at(0).text()).toEqual('foo');
    });

    it('question displayed', () => {
        expect(wrapper.find('.text').at(0).text()).toEqual('foo');
    });

    it('instructions displayed', () => {
        expect(wrapper.find('.text').at(1).text()).toEqual('bar');
    });

    it('basic state has first one selected', () => {
        expect(wrapper.state().selected).toEqual(0);
    });

    it('options displayed', () => {
        expect(wrapper.find('.options').find('li')).toHaveLength(3);
        expect(wrapper.find('.options').text()).toEqual(
            'MultiplesFactorsPrimes'
        );
    });

    it('first option is selected', () => {
        expect(
            wrapper.find('.options').find('li').at(0).hasClass('selected')
        ).toEqual(true);
    });

    it('other options are not selected', () => {
        expect(
            wrapper.find('.options').find('li').at(1).hasClass('selected')
        ).toEqual(false);
        expect(
            wrapper.find('.options').find('li').at(2).hasClass('selected')
        ).toEqual(false);
    });

    it('selects the non-selected option on "clicking"', () => {
        wrapper.instance().clickedOption(2);
        expect(wrapper.state().selected).toEqual(2);
    });

    it('chooses the game on "clicking"', () => {
        wrapper.instance().select = jest.fn();
        wrapper.update();
        wrapper.instance().clickedOption(0);
        expect(wrapper.instance().select).toBeCalledWith();
    });

    // TODO - can't test this quite yet
    // it('selecting nothing renders game', () => {
    //     wrapper.instance().select();
    //     expect(wrapper.find('.title').text()).toEqual(
    //         `Multiples of ${wrapper.state().game.getNumber()}`
    //     );
    // });

    it('moving down increments the selected state', () => {
        wrapper.instance().select(1);
        expect(wrapper.state().selected).toEqual(1);
    });

    it('moving up increments the selected state', () => {
        wrapper.instance().select(1);
        wrapper.instance().select(-1);
        expect(wrapper.state().selected).toEqual(0);
    });

    it('moving negative wraps the selected state', () => {
        wrapper.instance().select(-1);
        expect(wrapper.state().selected).toEqual(2);
    });

    it('moving too far wraps the selected state', () => {
        wrapper.instance().select(3);
        expect(wrapper.state().selected).toEqual(0);
    });

    it('hitting enter renders game', () => {
        wrapper.instance().select = jest.fn();
        wrapper.update();
        wrapper.instance().keyDown({ code: 'Enter' });
        expect(wrapper.instance().select).toBeCalledWith();
    });

    it('hitting down increments the selected state', () => {
        wrapper.instance().keyDown({ code: 'ArrowDown' });
        expect(wrapper.state().selected).toEqual(1);
    });

    it('hitting right increments the selected state', () => {
        wrapper.instance().keyDown({ code: 'ArrowRight' });
        expect(wrapper.state().selected).toEqual(1);
    });

    it('hitting up increments the selected state', () => {
        wrapper.instance().keyDown({ code: 'ArrowDown' });
        wrapper.instance().keyDown({ code: 'ArrowUp' });
        expect(wrapper.state().selected).toEqual(0);
    });

    it('hitting left increments the selected state', () => {
        wrapper.instance().keyDown({ code: 'ArrowDown' });
        wrapper.instance().keyDown({ code: 'ArrowLeft' });
        expect(wrapper.state().selected).toEqual(0);
    });

    it('hitting space does nothing', () => {
        wrapper.instance().keyDown({ code: 'Space' });
        expect(wrapper.state().selected).toEqual(0);
    });

    it('select second option', () => {
        const event = new KeyboardEvent('keydown', { code: 'ArrowDown' });
        document.dispatchEvent(event);
        expect(wrapper.state().selected).toEqual(1);
    });

    it('select third option', () => {
        const event = new KeyboardEvent('keydown', { code: 'ArrowUp' });
        document.dispatchEvent(event);
        expect(wrapper.state().selected).toEqual(2);
    });

    it('selects the option when clicking on it', () => {
        wrapper.find('li').at(2).simulate('click');
        expect(wrapper.state().selected).toEqual(2);
    });

    it('selects the game when clicking on something selected', () => {
        wrapper.instance().select = jest.fn();
        wrapper.update();
        wrapper.find('li').at(0).simulate('click');
        expect(wrapper.instance().select).toBeCalledWith();
    });
});

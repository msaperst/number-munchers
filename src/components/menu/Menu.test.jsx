import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render } from '@testing-library/react';
import Menu from './Menu';
import Multiples from '../../objects/Multiples';
import Factors from '../../objects/Factors';
import Primes from '../../objects/Primes';

Enzyme.configure({ adapter: new Adapter() });

describe('<Menu/>', () => {
    let wrapper;

    beforeEach(() => {
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

    // TODO - can't test this quite yet
    // it('hitting enter renders game', () => {
    //     wrapper.instance().keyDown('Enter');
    //     expect(wrapper.find('.title').text()).toEqual(
    //         `Multiples of ${wrapper.state().game.getNumber()}`
    //     );
    // });

    it('hitting down increments the selected state', () => {
        wrapper.instance().keyDown('ArrowDown');
        expect(wrapper.state().selected).toEqual(1);
    });

    it('hitting right increments the selected state', () => {
        wrapper.instance().keyDown('ArrowRight');
        expect(wrapper.state().selected).toEqual(1);
    });

    it('hitting up increments the selected state', () => {
        wrapper.instance().keyDown('ArrowDown');
        wrapper.instance().keyDown('ArrowUp');
        expect(wrapper.state().selected).toEqual(0);
    });

    it('hitting left increments the selected state', () => {
        wrapper.instance().keyDown('ArrowDown');
        wrapper.instance().keyDown('ArrowLeft');
        expect(wrapper.state().selected).toEqual(0);
    });

    it('hitting space does nothing', () => {
        wrapper.instance().keyDown('Space');
        expect(wrapper.state().selected).toEqual(0);
    });

    // TODO - can't test this quite yet
    // it('renders multiples when selecting multiples', () => {
    //     const event = new KeyboardEvent('keydown', { code: 'Enter' });
    //     document.dispatchEvent(event);
    // });

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

    // TODO - can't test this quite yet
    // it('clicking enter renders game', () => {
    //     wrapper.find('instance().keyDown('Enter');
    //     expect(wrapper.find('.title').text()).toEqual(
    //         `Multiples of ${wrapper.state().game.getNumber()}`
    //     );
    // });

    it('clicking down increments the selected state', () => {
        wrapper.find('.down').simulate('click');
        expect(wrapper.state().selected).toEqual(1);
    });

    it('clicking right increments the selected state', () => {
        wrapper.find('.right').simulate('click');
        expect(wrapper.state().selected).toEqual(1);
    });

    it('clicking up increments the selected state', () => {
        wrapper.find('.down').simulate('click');
        wrapper.find('.up').simulate('click');
        expect(wrapper.state().selected).toEqual(0);
    });

    it('clicking left increments the selected state', () => {
        wrapper.find('.down').simulate('click');
        wrapper.find('.left').simulate('click');
        expect(wrapper.state().selected).toEqual(0);
    });
});

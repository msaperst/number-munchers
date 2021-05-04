import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Game from './Game';

Enzyme.configure({ adapter: new Adapter() });

describe('movement', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = Enzyme.shallow(<Game />);
        wrapper.setState({ number: 5 });
        const squares = Array(30).fill(5);
        squares[13] = 4;
        wrapper.setState({ squares });
    });

    it('can perform a good munch', () => {
        let event = new KeyboardEvent('keydown', { code: 'Space' });
        document.dispatchEvent(event);
        expect(wrapper.state().squares[14]).toEqual('');
        expect(wrapper.state().score).toEqual(5);
        expect(wrapper.state().lives).toEqual(3);
        expect(wrapper.render().find('.notification')).toHaveLength(0);
        event = new KeyboardEvent('keydown', { code: 'ArrowLeft' });
        document.dispatchEvent(event);
        event = new KeyboardEvent('keydown', { code: 'Space' });
        document.dispatchEvent(event);
        expect(wrapper.state().squares[13]).toEqual('');
        expect(wrapper.state().score).toEqual(5);
        expect(wrapper.state().lives).toEqual(2);
        expect(wrapper.render().find('.notification').text()).toEqual(
            '"4" is not a multiple of "5".Press Space Bar to continue.'
        );
        // dismissing bad munch
        expect(wrapper.state().muncher).toEqual({ x: 1, y: 2 });
        document.dispatchEvent(event);
        expect(wrapper.state().muncher).toEqual({ x: 1, y: 2 });
        document.dispatchEvent(event);
        expect(wrapper.state().squares[13]).toEqual('');
        expect(wrapper.state().score).toEqual(5);
        expect(wrapper.state().lives).toEqual(2);
        expect(wrapper.render().find('.notification')).toHaveLength(0);
    });
});

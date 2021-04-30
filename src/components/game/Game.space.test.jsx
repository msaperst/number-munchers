import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Game from './Game';

Enzyme.configure({ adapter: new Adapter() });

describe('<Game/>', () => {
    it('munches', () => {
        const events = {};
        document.addEventListener = jest.fn((event, cb) => {
            events[event] = cb;
        });
        const wrapper = Enzyme.mount(<Game />);
        const squares = Array(30).fill(5);
        squares[13] = 4;
        wrapper.state().squares = squares;

        // good munch
        expect(wrapper.state().squares[14]).toEqual(5);
        expect(wrapper.state().score).toEqual(0);
        expect(wrapper.state().lives).toEqual(3);
        events.keydown({ keyCode: 32 });
        expect(wrapper.state().squares[14]).toEqual('');
        expect(wrapper.state().score).toEqual(5);
        expect(wrapper.state().lives).toEqual(3);
        expect(wrapper.render().find('.notification')).toHaveLength(0);

        // bad munch
        events.keydown({ keyCode: 37 });
        expect(wrapper.state().squares[13]).toEqual(4);
        expect(wrapper.state().score).toEqual(5);
        expect(wrapper.state().lives).toEqual(3);
        events.keydown({ keyCode: 32 });
        expect(wrapper.state().squares[13]).toEqual('');
        expect(wrapper.state().score).toEqual(5);
        expect(wrapper.state().lives).toEqual(2);
        expect(wrapper.render().find('.notification').text()).toEqual(
            '"4" is not a multiple of "5".Press Space Bar to continue.'
        );

        // dismissing bad munch
        expect(wrapper.state().muncher).toEqual({ x: 1, y: 2 });
        events.keydown({ keyCode: 37 });
        events.keydown({ keyCode: 38 });
        expect(wrapper.state().muncher).toEqual({ x: 1, y: 2 });
        events.keydown({ keyCode: 32 });
        expect(wrapper.state().squares[13]).toEqual('');
        expect(wrapper.state().score).toEqual(5);
        expect(wrapper.state().lives).toEqual(2);
        expect(wrapper.render().find('.notification')).toHaveLength(0);
    });
});

import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Game from "./Game";

Enzyme.configure({adapter: new Adapter()});

describe('<Game/>', () => {
    it('Munches', () => {
        let events = {};
        document.addEventListener = jest.fn((event, cb) => {
            events[event] = cb;
        });
        let wrapper = Enzyme.shallow(<Game/>);
        expect(wrapper.state().squares[14]).not.toEqual('');
        events.keydown({keyCode: 32});
        expect(wrapper.state().squares[14]).toEqual('');
        events.keydown({keyCode: 37});
        expect(wrapper.state().squares[13]).not.toEqual('');
        events.keydown({keyCode: 32});
        expect(wrapper.state().squares[13]).toEqual('');
    });
});
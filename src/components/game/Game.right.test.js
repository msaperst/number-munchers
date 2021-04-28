import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Game from "./Game";

Enzyme.configure({adapter: new Adapter()});

describe('<Game/>', () => {
    it('Move Muncher Right', () => {
        let events = {};
        document.addEventListener = jest.fn((event, cb) => {
            events[event] = cb;
        });
        let wrapper = Enzyme.shallow(<Game/>);
        events.keydown({keyCode: 39});
        expect(wrapper.state().muncher).toEqual({x: 3, y: 2});
    });
});
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Game from "./Game";

Enzyme.configure({adapter: new Adapter()});

describe('<Game/>', () => {
    it('Move Muncher Down', () => {
        let events = {};
        document.addEventListener = jest.fn((event, cb) => {
            events[event] = cb;
        });
        let wrapper = Enzyme.shallow(<Game/>);
        events.keydown({keyCode: 40});
        expect(wrapper.state().muncher).toEqual({x: 2, y: 3});
    });
});
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Game from "./Game";

Enzyme.configure({adapter: new Adapter()});

describe('<Game/>', () => {
    let wrapper;
    let events;

    beforeEach(() => {
        events = {};
        document.addEventListener = jest.fn((event, cb) => {
            events[event] = cb;
        });
        wrapper = Enzyme.shallow(<Game/>);
    });

    it('Level 1 Displayed', () => {
        expect(wrapper.find('.level').text()).toEqual('Level: 1');
    });

    it('Activity Displayed', () => {
        expect(wrapper.find('.title').text()).toEqual('Multiples of 5');
    });

    it('Basic Muncher Position', () => {
        expect(wrapper.state().muncher).toEqual({x: 2, y: 2});
    });

    it('Move Muncher Other', () => {
        events.keydown({keyCode: 30});
        expect(wrapper.state().muncher).toEqual({x: 2, y: 2});
    });
});
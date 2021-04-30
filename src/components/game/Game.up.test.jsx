import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Game from './Game';

Enzyme.configure({ adapter: new Adapter() });

describe('<Game/>', () => {
    it('move Muncher Up', () => {
        const events = {};
        document.addEventListener = jest.fn((event, cb) => {
            events[event] = cb;
        });
        const wrapper = Enzyme.shallow(<Game />);
        events.keydown({ keyCode: 38 });
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 1 });
        events.keydown({ keyCode: 38 });
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 0 });
        events.keydown({ keyCode: 38 });
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 0 });
    });
});

import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Game, { update } from './Game';

Enzyme.configure({ adapter: new Adapter() });

describe('<Game/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = Enzyme.shallow(<Game />);
    });

    it('updates pass', () => {
        expect(wrapper.state().score).toEqual(0);
        update({ isValid: true, value: 5 });
        expect(wrapper.state().score).toEqual(5);
    });

    it('updates nothing', () => {
        expect(wrapper.state().score).toEqual(0);
        update({ isValid: true, value: '' });
        expect(wrapper.state().score).toEqual(0);
    });
});

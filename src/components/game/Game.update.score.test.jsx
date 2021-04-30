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

    it('updates score', () => {
        expect(wrapper.state().score).toEqual(0);
        update(true);
        expect(wrapper.state().score).toEqual(5);
    });
});

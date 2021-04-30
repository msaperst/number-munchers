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

    it('updates fail', () => {
        expect(wrapper.state().lives).toEqual(3);
        expect(wrapper.state().notification).toEqual('');
        update({ isValid: false, value: 4 });
        expect(wrapper.state().lives).toEqual(2);
        expect(wrapper.state().notification).toEqual(
            '"4" is not a multiple of "5".'
        );
    });
});

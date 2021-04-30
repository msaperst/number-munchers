import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Game, { munch } from './Game';
import { GAME_TYPES } from '../../objects/games';

Enzyme.configure({ adapter: new Adapter() });

describe('<Game/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = Enzyme.shallow(<Game />);
        wrapper.state().squares = [
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
            5,
        ];
        wrapper.state().type = GAME_TYPES.MULTIPLES;
        wrapper.state().number = 5;
    });

    it('basic Munch Checking', () => {
        munch();
        expect(wrapper.state().squares[14]).toEqual('');
    });

    it('is valid', () => {
        expect(munch()).toEqual(true);
    });
});

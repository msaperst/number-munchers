import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Game, { munch, numberFill } from './Game';
import { GAME_TYPES } from '../../objects/games';

Enzyme.configure({ adapter: new Adapter() });

describe('<Game/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = Enzyme.shallow(<Game />);
        wrapper.state().type = GAME_TYPES.MULTIPLES;
        wrapper.state().number = 0;
    });

    it('multiplier for Number Filler', () => {
        expect(numberFill(GAME_TYPES.MULTIPLES, 0)).toEqual(0);
    });

    it('not valid', () => {
        expect(munch().isValid).toEqual(false);
    });
});

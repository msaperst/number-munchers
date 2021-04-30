import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Game, { munch, numberFill } from './Game';

Enzyme.configure({ adapter: new Adapter() });

describe('<Game/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = Enzyme.shallow(<Game />);
        wrapper.setState({ type: '' });
        wrapper.setState({ number: 5 });
    });

    it('return empty', () => {
        expect(numberFill()).toEqual('');
    });

    it('not valid', () => {
        expect(munch().isValid).toEqual(false);
    });
});

import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Game from './Game';
import Multiples from '../../objects/Multiples';
import * as Troggle from '../troggle/Troggle';

Enzyme.configure({ adapter: new Adapter() });

describe('movement', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = Enzyme.mount(<Game game={new Multiples()} />);
        const squares = Array(30).fill(wrapper.state().game.getNumber());
        squares[13] = 97;
        wrapper.setState({ squares });
    });

    it('can perform a good munch', () => {
        let event = new KeyboardEvent('keydown', { code: 'Space' });
        document.dispatchEvent(event);
        expect(wrapper.state().squares[14]).toEqual('');
        expect(wrapper.state().score).toEqual(5);
        expect(wrapper.state().lives).toEqual(3);
        expect(wrapper.render().find('.notification')).toHaveLength(0);
        event = new KeyboardEvent('keydown', { code: 'ArrowLeft' });
        document.dispatchEvent(event);
        event = new KeyboardEvent('keydown', { code: 'Space' });
        document.dispatchEvent(event);
        expect(wrapper.state().squares[13]).toEqual('');
        expect(wrapper.state().score).toEqual(5);
        expect(wrapper.state().lives).toEqual(2);
        expect(wrapper.render().find('.notification').text()).toEqual(
            `"97" is not a multiple of "${wrapper
                .state()
                .game.getNumber()}".Press Space Bar to continue.`
        );
        // dismissing bad munch
        expect(wrapper.state().muncher).toEqual({ x: 1, y: 2 });
        document.dispatchEvent(event);
        expect(wrapper.state().muncher).toEqual({ x: 1, y: 2 });
        document.dispatchEvent(event);
        expect(wrapper.state().squares[13]).toEqual('');
        expect(wrapper.state().score).toEqual(5);
        expect(wrapper.state().lives).toEqual(2);
        expect(wrapper.render().find('.notification')).toHaveLength(0);

        // able to move with keys
        wrapper.find('.right').simulate('click');
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 2 });
        wrapper.find('.down').simulate('click');
        expect(wrapper.state().muncher).toEqual({ x: 2, y: 3 });
        wrapper.find('.left').simulate('click');
        expect(wrapper.state().muncher).toEqual({ x: 1, y: 3 });
        wrapper.find('.up').simulate('click');
        expect(wrapper.state().muncher).toEqual({ x: 1, y: 2 });
        wrapper.find('.left').simulate('click');
        wrapper.find('.space').simulate('click');
        expect(wrapper.state().squares[12]).toEqual('');
    });

    it('manages troggles if there is not a notification', () => {
        const spyCheck = jest.spyOn(wrapper.instance(), 'troggleMuncherCheck');
        const spyAdd = jest.spyOn(Troggle, 'addTroggle');
        const spyMove = jest.spyOn(Troggle, 'moveTroggles');
        wrapper.state().notification = '';
        wrapper.instance().troggle();
        expect(spyCheck).toHaveBeenCalled();
        expect(spyAdd).toHaveBeenCalled();
        expect(spyMove).toHaveBeenCalled();
        jest.clearAllMocks();
    });
});

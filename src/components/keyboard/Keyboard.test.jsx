import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Keyboard from './Keyboard';

Enzyme.configure({ adapter: new Adapter() });

describe('<Keyboard/>', () => {
    it('recognizes up', () => {
        let x = 2;
        const up = () => {
            x = 5;
        };
        const keyboard = Enzyme.shallow(<Keyboard up={up} />);
        keyboard.find('.up').simulate('click');
        expect(x).toEqual(5);
    });

    it('recognizes down', () => {
        let x = 2;
        const down = () => {
            x = 5;
        };
        const keyboard = Enzyme.shallow(<Keyboard down={down} />);
        keyboard.find('.down').simulate('click');
        expect(x).toEqual(5);
    });

    it('recognizes left', () => {
        let x = 2;
        const left = () => {
            x = 5;
        };
        const keyboard = Enzyme.shallow(<Keyboard left={left} />);
        keyboard.find('.left').simulate('click');
        expect(x).toEqual(5);
    });

    it('recognizes right', () => {
        let x = 2;
        const right = () => {
            x = 5;
        };
        const keyboard = Enzyme.shallow(<Keyboard right={right} />);
        keyboard.find('.right').simulate('click');
        expect(x).toEqual(5);
    });

    it('recognizes space', () => {
        let x = 2;
        const space = () => {
            x = 5;
        };
        const keyboard = Enzyme.shallow(<Keyboard space={space} />);
        keyboard.find('.space').simulate('click');
        expect(x).toEqual(5);
    });
});

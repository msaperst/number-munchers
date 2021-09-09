import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Calibrate from './Calibrate';
import Difficulty from './Difficulty';
import Content from './Content';
import Hall from './Hall';
import Joystick from './Joystick';
import Password from './Password';

Enzyme.configure({ adapter: new Adapter() });

describe('menus', () => {
    // correct name is returned

    it('calibrate returns correct name', () => {
        expect(new Calibrate().getName()).toEqual('Calibrate Joystick');
    });

    it('content returns correct name', () => {
        expect(new Content().getName()).toEqual('Set Content');
    });

    it('difficulty returns correct name', () => {
        expect(new Difficulty().getName()).toEqual('Set Difficulty Level');
    });

    it('hall returns correct name', () => {
        expect(new Hall().getName()).toEqual('Erase Hall of Fame');
    });

    it('joystick returns correct name', () => {
        expect(new Joystick().getName()).toEqual('Turn Joystick ON');
    });

    it('password returns correct name', () => {
        expect(new Password().getName()).toEqual('Set Password');
    });

    // correct screen is returned

    it('calibrate returns no screen', () => {
        const e = () => {
            new Calibrate().getScreen();
        };
        expect(e).toThrow(TypeError);
    });

    it('content returns no screen', () => {
        const e = () => {
            new Content().getScreen();
        };
        expect(e).toThrow(TypeError);
    });

    it('difficulty returns no screen', () => {
        const e = () => {
            new Difficulty().getScreen();
        };
        expect(e).toThrow(TypeError);
    });

    it('hall returns no screen', () => {
        const e = () => {
            new Hall().getScreen();
        };
        expect(e).toThrow(TypeError);
    });

    it('joystick returns no screen', () => {
        const e = () => {
            new Joystick().getScreen();
        };
        expect(e).toThrow(TypeError);
    });

    it('password returns no screen', () => {
        const e = () => {
            new Password().getScreen();
        };
        expect(e).toThrow(TypeError);
    });
});

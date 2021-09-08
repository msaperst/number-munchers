import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Hall from './Hall';
import Info from './Info';
import Option from './Option';
import Play from './Play';
import Quit from './Quit';

Enzyme.configure({ adapter: new Adapter() });

describe('menus', () => {
    // correct name is returned

    it('hall returns correct name', () => {
        expect(new Hall().getName()).toEqual('Hall of Fame');
    });

    it('info returns correct name', () => {
        expect(new Info().getName()).toEqual('Information');
    });

    it('option returns correct name', () => {
        expect(new Option().getName()).toEqual('Options');
    });

    it('play returns correct name', () => {
        expect(new Play().getName()).toEqual('Play Number Munchers');
    });

    it('quit returns correct name', () => {
        expect(new Quit().getName()).toEqual('Quit');
    });

    // correct screen is returned

    it('hall returns no screen', () => {
        const e = () => {
            new Hall().getScreen();
        };
        expect(e).toThrow(TypeError);
    });

    it('info returns no screen', () => {
        const e = () => {
            new Info().getScreen();
        };
        expect(e).toThrow(TypeError);
    });

    it('option returns correct screen', () => {
        const wrapper = Enzyme.mount(new Option().getScreen());
        expect(wrapper.find('.text').at(0).text()).toEqual('Choose an option:');
        expect(wrapper.find('.options').find('li')).toHaveLength(6);
        expect(wrapper.find('.options').text()).toEqual(
            'Set Difficulty LevelSet ContentErase Hall of FameSet PasswordTurn Joystick ONCalibrate Joystick'
        );
        expect(wrapper.find('.text').at(1).text()).toEqual(
            'Use Arrows to move, then press Enter. Escape: Main Menu'
        );
    });

    it('play returns correct screen', () => {
        const wrapper = Enzyme.mount(new Play().getScreen());
        expect(wrapper.find('.text').at(0).text()).toEqual(
            'Which Number Munchers game would you like to play'
        );
        expect(wrapper.find('.options').find('li')).toHaveLength(3);
        expect(wrapper.find('.options').text()).toEqual(
            'MultiplesFactorsPrimes'
        );
        expect(wrapper.find('.text').at(1).text()).toEqual(
            'Use Arrows to move, then press Enter'
        );
    });

    it('quit returns no screen', () => {
        const e = () => {
            new Quit().getScreen();
        };
        expect(e).toThrow(TypeError);
    });
});

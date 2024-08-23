import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Hall from './Hall';
import Info from './Info';
import Option from './Option';
import Play from './Play';
import Quit from './Quit';
import { optionsMenu } from './options/Difficulty.test';

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
        optionsMenu(new Option());
    });

    it('play returns correct screen level 0', () => {
        localStorage.setItem('difficulty', 0);
        const wrapper = Enzyme.mount(new Play().getScreen());
        expect(wrapper.find('.text').at(0).text()).toEqual(
            'Which Number Munchers game would you like to play'
        );
        expect(wrapper.find('.options').find('li')).toHaveLength(1);
        expect(wrapper.find('.options').text()).toEqual('Equality');
        expect(wrapper.find('.text').at(1).text()).toEqual(
            'Use Arrows to move, then press Enter'
        );
    });

    it('play returns correct screen level 2', () => {
        localStorage.setItem('difficulty', 2);
        const wrapper = Enzyme.mount(new Play().getScreen());
        expect(wrapper.find('.text').at(0).text()).toEqual(
            'Which Number Munchers game would you like to play'
        );
        expect(wrapper.find('.options').find('li')).toHaveLength(3);
        expect(wrapper.find('.options').text()).toEqual(
            'MultiplesFactorsEquality'
        );
        expect(wrapper.find('.text').at(1).text()).toEqual(
            'Use Arrows to move, then press Enter'
        );
    });

    it('play returns correct screen level 6', () => {
        localStorage.setItem('difficulty', 6);
        const wrapper = Enzyme.mount(new Play().getScreen());
        expect(wrapper.find('.text').at(0).text()).toEqual(
            'Which Number Munchers game would you like to play'
        );
        expect(wrapper.find('.options').find('li')).toHaveLength(4);
        expect(wrapper.find('.options').text()).toEqual(
            'MultiplesFactorsEqualityPrimes'
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

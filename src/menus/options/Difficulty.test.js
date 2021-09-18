import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Difficulty from './Difficulty';

Enzyme.configure({ adapter: new Adapter() });

describe('difficulty', () => {
    // correct name is returned

    it('difficulty returns correct name', () => {
        expect(new Difficulty().getName()).toEqual('Set Difficulty Level');
    });

    it('difficulty returns correct screen', () => {
        const wrapper = Enzyme.mount(new Difficulty().getScreen());
        expect(wrapper.find('.text').at(0).text()).toEqual(
            `Current Difficulty: 3rd Grade Advanced\n\nChoose a level:`
        );
        expect(wrapper.find('.options').find('li')).toHaveLength(11);
        expect(wrapper.find('.options').text()).toEqual(
            '3rd Grade Easy3rd Grade Advanced4th Grade Easy4th Grade Advanced5th Grade Easy5th Grade Advanced6th Grade Easy6th Grade Advanced7th Grade Easy7th Grade Advanced8th Grade and Above'
        );
        expect(wrapper.find('.text').at(1).text()).toEqual(
            `Use Arrows to move, then press Enter.\n\nEscape: Options Menu`
        );
    });
});

// eslint-disable-next-line jest/no-export
export const optionsMenu = (option) => {
    const wrapper = Enzyme.mount(option.getScreen());
    expect(wrapper.find('.text').at(0).text()).toEqual('Choose an option:');
    expect(wrapper.find('.options').find('li')).toHaveLength(6);
    expect(wrapper.find('.options').text()).toEqual(
        'Set Difficulty LevelSet ContentErase Hall of FameSet PasswordTurn Joystick ONCalibrate Joystick'
    );
    expect(wrapper.find('.text').at(1).text()).toEqual(
        'Use Arrows to move, then press Enter. Escape: Main Menu'
    );
};

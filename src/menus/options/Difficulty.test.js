import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';
import Difficulty, {
    Grade3Advanced,
    Grade3Easy,
    Grade4Advanced,
    Grade4Easy,
    Grade5Advanced,
    Grade5Easy,
    Grade6Advanced,
    Grade6Easy,
    Grade7Advanced,
    Grade7Easy,
    Grade8AndAbove,
} from './Difficulty';

Enzyme.configure({ adapter: new Adapter() });

describe('difficulty', () => {
    // correct name is returned

    it('difficulty returns correct name', () => {
        expect(new Difficulty().getName()).toEqual('Set Difficulty Level');
    });

    it('returns a default selection of 1', () => {
        expect(new Difficulty().getSelected()).toEqual(1);
    });

    it('returns the set selection value', () => {
        localStorage.setItem('difficulty', 4);
        expect(new Difficulty().getSelected()).toEqual(4);
        localStorage.removeItem('difficulty');
    });

    it('difficulty returns correct screen', () => {
        const wrapper = Enzyme.mount(new Difficulty().getScreen());
        expect(wrapper.find('.text').at(0).text()).toEqual(
            'Current Difficulty: 3rd Grade AdvancedChoose a level:'
        );
        expect(wrapper.find('.options').find('li')).toHaveLength(11);
        expect(wrapper.find('.options').text()).toEqual(
            '3rd Grade Easy3rd Grade Advanced4th Grade Easy4th Grade Advanced5th Grade Easy5th Grade Advanced6th Grade Easy6th Grade Advanced7th Grade Easy7th Grade Advanced8th Grade and Above'
        );
        expect(wrapper.find('.text').at(1).text()).toEqual(
            'Use Arrows to move, then press Enter.Escape: Options Menu'
        );
    });

    it('returns the correct difficulty', () => {
        expect(Difficulty.getDifficulty(0)).toEqual(Grade3Easy);
        expect(Difficulty.getDifficulty(1)).toEqual(Grade3Advanced);
        expect(Difficulty.getDifficulty(2)).toEqual(Grade4Easy);
        expect(Difficulty.getDifficulty(3)).toEqual(Grade4Advanced);
        expect(Difficulty.getDifficulty(4)).toEqual(Grade5Easy);
        expect(Difficulty.getDifficulty(5)).toEqual(Grade5Advanced);
        expect(Difficulty.getDifficulty(6)).toEqual(Grade6Easy);
        expect(Difficulty.getDifficulty(7)).toEqual(Grade6Advanced);
        expect(Difficulty.getDifficulty(8)).toEqual(Grade7Easy);
        expect(Difficulty.getDifficulty(9)).toEqual(Grade7Advanced);
        expect(Difficulty.getDifficulty(10)).toEqual(Grade8AndAbove);
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
        'Use Arrows to move, then press Enter.Escape: Main Menu'
    );
};

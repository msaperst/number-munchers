import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
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

    it('3rd grade easy returns correct name', () => {
        expect(new Grade3Easy().getName()).toEqual('3rd Grade Easy');
    });

    it('3rd grade advanced returns correct name', () => {
        expect(new Grade3Advanced().getName()).toEqual('3rd Grade Advanced');
    });

    it('4th grade easy returns correct name', () => {
        expect(new Grade4Easy().getName()).toEqual('4th Grade Easy');
    });

    it('4th grade advanced returns correct name', () => {
        expect(new Grade4Advanced().getName()).toEqual('4th Grade Advanced');
    });

    it('5th grade easy returns correct name', () => {
        expect(new Grade5Easy().getName()).toEqual('5th Grade Easy');
    });

    it('5th grade advanced returns correct name', () => {
        expect(new Grade5Advanced().getName()).toEqual('5th Grade Advanced');
    });

    it('6th grade easy returns correct name', () => {
        expect(new Grade6Easy().getName()).toEqual('6th Grade Easy');
    });

    it('6th grade advanced returns correct name', () => {
        expect(new Grade6Advanced().getName()).toEqual('6th Grade Advanced');
    });

    it('7th grade easy returns correct name', () => {
        expect(new Grade7Easy().getName()).toEqual('7th Grade Easy');
    });

    it('7th grade advanced returns correct name', () => {
        expect(new Grade7Advanced().getName()).toEqual('7th Grade Advanced');
    });

    it('8th grade and above returns correct name', () => {
        expect(new Grade8AndAbove().getName()).toEqual('8th Grade and Above');
    });

    // correct screen is returned

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

    it('3rd grade easy returns correct screen', () => {
        optionsMenu(new Grade3Easy());
        expect(localStorage.getItem('difficulty')).toEqual('0');
    });

    it('3rd grade advanced returns correct screen', () => {
        optionsMenu(new Grade3Advanced());
        expect(localStorage.getItem('difficulty')).toEqual('1');
    });

    it('4th grade easy returns correct screen', () => {
        optionsMenu(new Grade4Easy());
        expect(localStorage.getItem('difficulty')).toEqual('2');
    });

    it('4th grade advanced returns correct screen', () => {
        optionsMenu(new Grade4Advanced());
        expect(localStorage.getItem('difficulty')).toEqual('3');
    });

    it('5th grade easy returns correct screen', () => {
        optionsMenu(new Grade5Easy());
        expect(localStorage.getItem('difficulty')).toEqual('4');
    });

    it('5th grade advanced returns correct screen', () => {
        optionsMenu(new Grade5Advanced());
        expect(localStorage.getItem('difficulty')).toEqual('5');
    });

    it('6th grade easy returns correct screen', () => {
        optionsMenu(new Grade6Easy());
        expect(localStorage.getItem('difficulty')).toEqual('6');
    });

    it('6th grade advanced returns correct screen', () => {
        optionsMenu(new Grade6Advanced());
        expect(localStorage.getItem('difficulty')).toEqual('7');
    });

    it('7th grade easy returns correct screen', () => {
        optionsMenu(new Grade7Easy());
        expect(localStorage.getItem('difficulty')).toEqual('8');
    });

    it('7th grade advanced returns correct screen', () => {
        optionsMenu(new Grade7Advanced());
        expect(localStorage.getItem('difficulty')).toEqual('9');
    });

    it('8th grade and above returns correct screen', () => {
        optionsMenu(new Grade8AndAbove());
        expect(localStorage.getItem('difficulty')).toEqual('10');
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

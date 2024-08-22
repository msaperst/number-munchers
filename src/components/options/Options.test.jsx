import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Options from './Options';
import Multiples from '../../games/Multiples';
import Factors from '../../games/Factors';
import Primes from '../../games/Primes';

Enzyme.configure({ adapter: new Adapter() });

describe('<Option/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = Enzyme.mount(
            <Options
                options={[new Multiples(), new Factors(), new Primes()]}
                selected={1}
            />
        );
    });

    it('options displayed', () => {
        expect(wrapper.find('.options').find('li')).toHaveLength(3);
        expect(wrapper.find('.options').text()).toEqual(
            'MultiplesFactorsPrimes'
        );
    });

    it('second option is selected', () => {
        expect(
            wrapper.find('.options').find('li').at(1).hasClass('selected')
        ).toBeTruthy();
    });

    it('other options are not selected', () => {
        expect(
            wrapper.find('.options').find('li').at(0).hasClass('selected')
        ).toBeFalsy();
        expect(
            wrapper.find('.options').find('li').at(2).hasClass('selected')
        ).toBeFalsy();
    });

    it('clicking the elements returns the element', () => {
        const onClick = (option) => {
            expect(option).toEqual(2);
        };
        const wrapper = Enzyme.mount(
            <Options
                options={[new Multiples(), new Factors(), new Primes()]}
                selected={0}
                onClick={(option) => onClick(option)}
            />
        );
        wrapper.find('li').at(2).simulate('click');
    });

    it('pressing the elements returns the element', () => {
        const onClick = (option) => {
            expect(option).toEqual(2);
        };
        const wrapper = Enzyme.mount(
            <Options
                options={[new Multiples(), new Factors(), new Primes()]}
                selected={0}
                onClick={(option) => onClick(option)}
            />
        );
        wrapper.find('li').at(2).simulate('keypress');
    });

    it('clicking the selected elements returns the element', () => {
        const onClick = (option) => {
            expect(option).toEqual(0);
        };
        const wrapper = Enzyme.mount(
            <Options
                options={[new Multiples(), new Factors(), new Primes()]}
                selected={0}
                onClick={(option) => onClick(option)}
            />
        );
        wrapper.find('li').at(0).simulate('click');
    });

    it('pressing the selected elements returns the element', () => {
        const onClick = (option) => {
            expect(option).toEqual(0);
        };
        const wrapper = Enzyme.mount(
            <Options
                options={[new Multiples(), new Factors(), new Primes()]}
                selected={0}
                onClick={(option) => onClick(option)}
            />
        );
        wrapper.find('li').at(0).simulate('keypress');
    });
});

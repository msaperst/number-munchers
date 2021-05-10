import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Options from './Options';
import Multiples from '../../objects/Multiples';
import Factors from '../../objects/Factors';

Enzyme.configure({ adapter: new Adapter() });

describe('<Options/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = Enzyme.mount(
            <Options
                options={[new Multiples(), new Factors(), new Multiples()]} // TODO - replace with a third one once written
                selected={1}
            />
        );
    });

    it('options displayed', () => {
        expect(wrapper.find('.options').find('li')).toHaveLength(3);
        expect(wrapper.find('.options').text()).toEqual(
            'MultiplesFactorsMultiples'
        );
    });

    it('second option is selected', () => {
        expect(
            wrapper.find('.options').find('li').at(1).hasClass('selected')
        ).toEqual(true);
    });

    it('other options are not selected', () => {
        expect(
            wrapper.find('.options').find('li').at(0).hasClass('selected')
        ).toEqual(false);
        expect(
            wrapper.find('.options').find('li').at(2).hasClass('selected')
        ).toEqual(false);
    });
});

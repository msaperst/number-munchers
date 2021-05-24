import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Square from './Square';

Enzyme.configure({ adapter: new Adapter() });

describe('<Square/>', () => {
    it('empty Square', () => {
        const square = render(<Square />);
        expect(square.container.querySelector('#c0')).toEqual(null);
    });

    it('get Bad Value', () => {
        const square = render(<Square cell="0" />);
        expect(square.container.querySelector('#c0').textContent).toEqual('');
    });

    it('get Good Value', () => {
        const square = render(<Square cell="0" value="5" />);
        expect(square.container.querySelector('#c0').textContent).toEqual('5');
    });

    it('returns the method when clicked', () => {
        const onClick = (value) => {
            expect(value).toEqual(1);
        };
        const wrapper = Enzyme.mount(
            <Square cell="0" value="5" onClick={() => onClick(1)} />
        );
        wrapper.find('div').at(0).simulate('click');
    });
});

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Muncher from './Muncher';

describe('<Muncher/>', () => {
    it('renders proper class', () => {
        const muncher = render(<Muncher position={{ x: 1, y: 1 }} />);
        expect(muncher.container.firstChild.className).toEqual('muncher');
    });

    it('renders proper added class', () => {
        const muncher = render(
            <Muncher position={{ x: 1, y: 1 }} display="super" />
        );
        expect(muncher.container.firstChild.className).toEqual('muncher super');
    });

    it('aligns', () => {
        const muncher = render(<Muncher position={{ x: 0, y: 0 }} />);
        expect(muncher.container.firstChild.style.left).toEqual('0px');
        expect(muncher.container.firstChild.style.top).toEqual('0px');
    });
});

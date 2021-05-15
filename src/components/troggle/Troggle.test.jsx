import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Troggle from './Troggle';

describe('<Troggle/>', () => {
    it('renders proper class', () => {
        const troggle = render(
            <Troggle position={{ x: 1, y: 1 }} troggle="happy" />
        );
        expect(troggle.container.firstChild.className).toEqual('troggle happy');
    });

    it('aligns', () => {
        const troggle = render(
            <Troggle position={{ x: 0, y: 0 }} troggle="happy" />
        );
        expect(troggle.container.firstChild.style.left).toEqual('0px');
        expect(troggle.container.firstChild.style.top).toEqual('0px');
    });
});

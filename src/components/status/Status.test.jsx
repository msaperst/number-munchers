import React from 'react';
import { render } from '@testing-library/react';
import Status from './Status';

describe('<Status/>', () => {
    it('is not present', () => {
        const status = render(<Status />);
        expect(status.container.querySelector('.status')).toEqual(null);
    });

    it('still is not present', () => {
        const status = render(<Status status="" />);
        expect(status.container.querySelector('.status')).toEqual(null);
    });

    it('displays provided message', () => {
        const status = render(<Status status="123" />);
        expect(status.container.querySelector('.status').textContent).toEqual(
            '123'
        );
    });
});

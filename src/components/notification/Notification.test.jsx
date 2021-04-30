import React from 'react';
import { render } from '@testing-library/react';
import Notification from './Notification';

describe('<Notification/>', () => {
    it('displays no message', () => {
        const notification = render(<Notification />);
        expect(
            notification.container.querySelector('.notification').textContent
        ).toEqual('Press Space Bar to continue.');
    });

    it('displays provided message', () => {
        const notification = render(<Notification message="123" />);
        expect(
            notification.container.querySelector('.notification').textContent
        ).toEqual('123Press Space Bar to continue.');
    });
});

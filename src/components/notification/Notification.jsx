import React from 'react';
import './Notification.css';

function Notification(props) {
    const { message, onClick } = props;
    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div className="notification" onClick={onClick}>
            {message}
            <br />
            Press Space Bar to continue.
        </div>
    );
}

export default Notification;

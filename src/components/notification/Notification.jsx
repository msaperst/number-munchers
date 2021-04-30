import React from 'react';
import './Notification.css';

function Notification(props) {
    const { message } = props;
    return (
        <div className="notification">
            {message}
            <br />
            Press Space Bar to continue.
        </div>
    );
}

export default Notification;

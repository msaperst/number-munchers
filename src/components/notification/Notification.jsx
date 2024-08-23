import React from 'react';
import './Notification.css';

function Notification(props) {
    const { message, onClick } = props;
    return (
        <div className="notification" onClick={onClick} onKeyPress={onClick}>
            {message}
            <br />
            Press Space Bar to continue.
        </div>
    );
}

export default Notification;

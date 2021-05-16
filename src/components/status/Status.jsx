import React from 'react';
import './Status.css';

function Status(props) {
    const { status } = props;
    let message = '';
    if (status !== '') {
        message = <div className="status">{status}</div>;
    }
    return message;
}

export default Status;

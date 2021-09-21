import React from 'react';
import './Quit.css';

function Quit(props) {
    const { yes, no } = props;
    return (
        <div className="quit">
            <br />
            Do you really want to quit?
            <span
                onClick={yes}
                onKeyPress={yes}
                role="button"
                className="quit-yes"
                tabIndex="0"
            >
                Yes
            </span>
            <span
                onClick={no}
                onKeyPress={no}
                role="button"
                className="quit-no"
                tabIndex="0"
            >
                No
            </span>
        </div>
    );
}

export default Quit;

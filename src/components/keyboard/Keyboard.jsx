import React from 'react';
import './Keyboard.css';

function Keyboard(props) {
    const { up, down, left, right, space, enter } = props;
    return (
        <div className="keyboard">
            <button type="button" className="enter" onClick={enter}>
                Enter
            </button>
            <button type="button" className="up" onClick={up}>
                Up
            </button>
            <button type="button" className="left" onClick={left}>
                Left
            </button>
            <button type="button" className="right" onClick={right}>
                Right
            </button>
            <button type="button" className="down" onClick={down}>
                Down
            </button>
            <button type="button" className="space" onClick={space}>
                Space
            </button>
        </div>
    );
}

export default Keyboard;

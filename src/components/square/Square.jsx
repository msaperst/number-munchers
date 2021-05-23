import React from 'react';
import './Square.css';

function Square(props) {
    const { cell, value, onClick } = props;
    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div key={cell} id={`c${cell}`} className="square" onClick={onClick}>
            {value}
        </div>
    );
}

export default Square;

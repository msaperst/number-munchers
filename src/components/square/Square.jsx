import React from 'react';
import './Square.css';

function Square(props) {
    const { cell, value, onClick } = props;
    return (
        <div
            key={cell}
            id={`c${cell}`}
            className="square"
            onClick={onClick}
            onKeyPress={onClick}
        >
            {value}
        </div>
    );
}

export default Square;

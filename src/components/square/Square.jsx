import React from 'react';
import './Square.css';

function Square(props) {
    const { cell, value } = props;
    return (
        <div key={cell} id={`c${cell}`} className="square">
            {value}
        </div>
    );
}

export default Square;

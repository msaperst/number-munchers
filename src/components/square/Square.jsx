import React from 'react';
import './Square.css';

function Square(props) {
    const { square } = props;
    return (
        <div key={square.cell} id={`c${square.cell}`} className="square">
            {square.value}
        </div>
    );
}

export default Square;

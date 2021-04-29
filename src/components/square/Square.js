import './Square.css'
import React from "react";

function Square(props) {
    return (
        <div key={props.cell} id={'c' + props.cell} className="square">
            {props.value}
        </div>
    )
}

export default Square;
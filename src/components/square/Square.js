import './Square.css'
import {GAME_TYPES} from "../../objects/games";
import Multiples from "../../objects/Multiples";
import React from "react";

class Square extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cell: props.cell,
            id: "c" + props.cell,
            value: getValue(props.type, props.number),
        };
    }

    render() {
        return (
            <div key={this.state.cell} id={this.state.id} className="square">
                {this.state.value}
            </div>
        )
    }
}

function getValue(type, number) {
    switch (type) {
        case GAME_TYPES.MULTIPLES:
            return Multiples(number);
        default:
            return '';
    }
}

export default Square;
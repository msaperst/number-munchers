import './Square.css'
import {GAME_TYPES} from "../../objects/games";
import Multiples from "../../objects/Multiples";

function Square(props) {
    const cellId = "c" + props.cell;
    return (
        <div key={props.cell} id={cellId} className="square">
            {getValue(props.type, props.number)}
        </div>
    )
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
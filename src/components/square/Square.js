import './Square.css'

function Square(props) {
    return (
        <div key={props.value} className="square">
            {props.value}
        </div>
    )
}

export default Square;
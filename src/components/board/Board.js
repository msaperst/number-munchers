import Square from "../square/Square";
import './Board.css';
import React from "react";
import Muncher from "../muncher/Muncher";

function Board(props) {
    const rows = getRows(props.height, props.width, props.squares);
    return (
        <div className="board">
            <Muncher position={props.muncher}/>
            {rows}
        </div>
    )
}

function getRows(height, width, squares) {
    const rows = [];
    for (let r = 0; r < height; r++) {
        const row = getRow(width, r, squares);
        rows.push(<div key={'row' + r} className="board-row">
            {row}
        </div>);
    }
    return rows;
}

function getRow(width, r, squares) {
    const row = [];
    for (let cell = 0; cell < width; cell++) {
        let int = (r * width + cell);
        row.push(<Square key={'c' + int} cell={int} value={squares[int]}/>);
    }
    return row;
}

export default Board;
export {getRows, getRow};
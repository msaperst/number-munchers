import Square from "../square/Square";
import './Board.css';
import React from "react";

function Board(props) {
    const width = 6;
    const height = 5;

    const rows = getRows(height, width, props.type, props.number);
    return (
        <div className="board">
            {rows}
        </div>
    )
}

function getRows(height, width, type, number) {
    const rows = [];
    for (let r = 0; r < height; r++) {
        const row = getRow(width, r, type, number);
        rows.push(<div className="board-row">
            {row}
        </div>);
    }
    return rows;
}

function getRow(width, r, type, number) {
    const row = [];
    for (let cell = 0; cell < width; cell++) {
        row.push(<Square type={type} number={number} cell={r * width + cell}/>);
    }
    return row;
}

export default Board;
export {getRows, getRow};
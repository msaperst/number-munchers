import Square from "../square/Square";
import './Board.css';
import React from "react";

function Board() {
    const width = 6;
    const height = 5;

    const rows = getRows(height, width);
    return (
        <div className="board">
            {rows}
        </div>
    )
}

function getRows(height, width) {
    const rows = [];
    for (let r = 0; r < height; r++) {
        const row = getRow(width, r);
        rows.push(<div className="board-row">
            {row}
        </div>);
    }
    return rows;
}

function getRow(width, r) {
    const row = [];
    for (let cell = 0; cell < width; cell++) {
        row.push(<Square value={r * width + cell}/>);
    }
    return row;
}

export default Board;
export {getRows, getRow};
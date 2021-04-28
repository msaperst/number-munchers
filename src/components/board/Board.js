import Square from "../square/Square";
import './Board.css';
import React from "react";
import Muncher from "../muncher/Muncher";

function Board(props) {
    const rows = getRows(props.height, props.width, props.type, props.number);
    return (
        <div className="board">
            <Muncher position={props.muncher}/>
            {rows}
        </div>
    )
}

function getRows(height, width, type, number) {
    const rows = [];
    for (let r = 0; r < height; r++) {
        const row = getRow(width, r, type, number);
        rows.push(<div key={'row' + r} className="board-row">
            {row}
        </div>);
    }
    return rows;
}

function getRow(width, r, type, number) {
    const row = [];
    for (let cell = 0; cell < width; cell++) {
        row.push(<Square key={'c' + (r * width + cell)} type={type} number={number} cell={r * width + cell}/>);
    }
    return row;
}

export default Board;
export {getRows, getRow};
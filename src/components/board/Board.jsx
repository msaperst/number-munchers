import React from 'react';
import Square from '../square/Square';
import './Board.css';
import Muncher from '../muncher/Muncher';
import Notification from '../notification/Notification';
import Troggle from '../troggle/Troggle';

function Board(props) {
    const { height, width, squares, muncher, troggles, notification } = props;
    let alert;
    if (notification != null && notification.trim() !== '') {
        alert = <Notification message={notification} />;
    }
    const theseTroggles = [];
    for (let t = 0; t < troggles.length; t++) {
        const troggle = troggles[t];
        theseTroggles.push(
            <Troggle
                key={t}
                position={{ x: troggle.x, y: troggle.y }}
                troggle={troggle.troggle}
            />
        );
    }
    const rows = getRows(height, width, squares);
    return (
        <div className="board">
            <Muncher position={muncher} />
            {theseTroggles}
            {alert}
            {rows}
        </div>
    );
}

function getRows(height, width, squares) {
    const rows = [];
    for (let r = 0; r < height; r++) {
        const row = getRow(width, r, squares);
        rows.push(
            <div key={`row${r}`} className="board-row">
                {row}
            </div>
        );
    }
    return rows;
}

function getRow(width, r, squares) {
    const row = [];
    for (let cell = 0; cell < width; cell++) {
        const int = r * width + cell;
        row.push(<Square key={`c${int}`} cell={int} value={squares[int]} />);
    }
    return row;
}

export default Board;
export { getRows, getRow };

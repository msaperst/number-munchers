import React from 'react';
import { useSwipeable } from 'react-swipeable';
import Square from '../square/Square';
import './Board.css';
import Muncher from '../muncher/Muncher';
import Notification from '../notification/Notification';
import Troggle from '../troggle/Troggle';

function Board(props) {
    const {
        height,
        width,
        squares,
        muncher,
        troggles,
        notification,
        movement,
    } = props;
    const handlers = useSwipeable({
        onSwipedUp: movement.up,
        onSwipedDown: movement.down,
        onSwipedLeft: movement.left,
        onSwipedRight: movement.right,
    });
    let alert;
    if (notification != null && notification.trim() !== '') {
        alert = (
            <Notification message={notification} onClick={movement.space} />
        );
    }
    const theseTroggles = [];
    for (let t = 0; t < troggles.length; t++) {
        const troggle = troggles[t];
        if (troggle.position !== undefined) {
            theseTroggles.push(
                <Troggle
                    key={t}
                    position={troggle.position}
                    troggle={troggle.troggle}
                />
            );
        }
    }
    const rows = getRows(height, width, squares, movement);
    return (
        <div className="board" {...handlers}>
            <Muncher position={muncher} display={muncher.display} />
            {theseTroggles}
            {alert}
            {rows}
        </div>
    );
}

function getRows(height, width, squares, movement) {
    const rows = [];
    for (let r = 0; r < height; r++) {
        const row = getRow(width, r, squares, movement);
        rows.push(
            <div key={`row${r}`} className="board-row">
                {row}
            </div>
        );
    }
    return rows;
}

function getRow(width, r, squares, movement) {
    const row = [];
    for (let cell = 0; cell < width; cell++) {
        const int = r * width + cell;
        row.push(
            <Square
                key={`c${int}`}
                cell={int}
                value={squares[int]}
                onClick={() => movement.click(cell, r)}
            />
        );
    }
    return row;
}

export default Board;
export { getRows, getRow };

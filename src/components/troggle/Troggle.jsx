import React from 'react';
import './Troggle.css';

/**
 * A method for handling the rendering of a troggle
 * In general a troggle has 3 different properties associated with it:
 * - position (x,y) object
 * - troggle (scientific name)
 * - movement (for some, as (x,y) object)
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Troggle(props) {
    const { position, troggle } = props;
    const troggleClass = `troggle ${troggle}`;
    return (
        <div
            ref={(el) => {
                const troggle = el;
                if (!troggle) return;
                troggle.style.left = `${
                    troggle.getBoundingClientRect().width * position.x
                }px`;
                troggle.style.top = `${
                    troggle.getBoundingClientRect().height * position.y
                }px`;
            }}
            className={troggleClass}
        />
    );
}

function moveTroggles(troggles, WIDTH, HEIGHT) {
    const remove = [];
    // move any existing troggles
    for (let t = 0; t < troggles.length; t++) {
        const troggle = troggles[t];
        if (troggle.position !== undefined) {
            troggle.position.x += troggle.direction.x;
            troggle.position.y += troggle.direction.y;
            if (
                troggle.position.x < 0 ||
                troggle.position.y < 0 ||
                troggle.position.x > WIDTH - 1 ||
                troggle.position.y > HEIGHT - 1
            ) {
                remove.push(t);
            }
        }
    }
    // remove any unneeded troggles
    for (let i = 0; i < remove.length; i++) {
        troggles.splice(i, 1);
    }
    return troggles;
}

function addTroggle(troggles, level, WIDTH, HEIGHT) {
    let status = '';
    // initialize any open troggles
    for (let t = 0; t < troggles.length; t++) {
        const troggle = troggles[t];
        if (troggle.position === undefined) {
            const { position, direction } = initializeTroggle(WIDTH, HEIGHT);
            troggle.position = position;
            troggle.direction = direction;
        }
    }
    // we should consider adding a troggle if the troggle count is less than twice the level (rounded up)
    if (troggles.length < Math.ceil(level / 2) && Math.random() < 0.2) {
        troggles.push({ troggle: 'normalus' }); // TODO - decide which monster to deploy based on level
        status = 'Troggle!';
    }
    return { troggles, status };
}

function initializeTroggle(WIDTH, HEIGHT) {
    let x = Math.floor(Math.random() * WIDTH);
    let y = Math.floor(Math.random() * HEIGHT);
    if (x > 0 && x < WIDTH - 1) {
        y = Math.abs(HEIGHT - 1 - y) < Math.abs(0 - y) ? HEIGHT - 1 : 0;
    }
    if (y > 0 && y < HEIGHT - 1) {
        x = Math.abs(WIDTH - 1 - x) < Math.abs(0 - x) ? WIDTH - 1 : 0;
    }
    let direction; // TODO - decide direction/movement based on troggle
    if (x === 0) {
        direction = { x: 1, y: 0 };
    } else if (x === WIDTH - 1) {
        direction = { x: -1, y: 0 };
    } else if (y === 0) {
        direction = { x: 0, y: 1 };
    } else {
        direction = { x: 0, y: -1 };
    }
    return { position: { x, y }, direction };
}

export default Troggle;
export { moveTroggles, addTroggle, initializeTroggle };

import React from 'react';
import './Troggle.css';

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

export default Troggle;

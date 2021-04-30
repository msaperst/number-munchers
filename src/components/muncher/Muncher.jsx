import React from 'react';
import './Muncher.css';

function Muncher(props) {
    // let initLeft = 2;
    // let initTop = 2;

    return (
        <div
            ref={(el) => {
                const muncher = el;
                if (!muncher) return;
                muncher.style.left = `${
                    muncher.getBoundingClientRect().width * props.position.x
                }px`;
                muncher.style.top = `${
                    muncher.getBoundingClientRect().height * props.position.y
                }px`;
            }}
            className="muncher"
        />
    );
}

export default Muncher;

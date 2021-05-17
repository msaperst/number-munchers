import React from 'react';
import './Muncher.css';

function Muncher(props) {
    const { display } = props;
    let muncherClass = 'muncher';
    if (display !== undefined) {
        muncherClass = `${muncherClass} ${display}`;
    }
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
            className={muncherClass}
        />
    );
}

export default Muncher;

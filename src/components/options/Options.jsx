import React from 'react';
import './Options.css';

function Options(props) {
    const { options, width, top, onClick } = props;
    const listElements = options.map((option, index) => {
        const title = option.getName();
        if (index === props.selected) {
            return (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <li
                    key={title}
                    className="selected"
                    onClick={() => onClick(index)}
                    onKeyPress={() => onClick(index)}
                >
                    {title}
                </li>
            );
        }
        return (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
                key={title}
                onClick={() => onClick(index)}
                onKeyPress={() => onClick(index)}
            >
                {title}
            </li>
        );
    });
    const oWidth = width || 'w300';
    const oTop = top || 't20';
    return (
        <div className="options">
            <ol className={`${oWidth} ${oTop}`}>{listElements}</ol>
        </div>
    );
}

export default Options;

import React from 'react';
import './Options.css';

function Options(props) {
    const { options, onClick } = props;
    const listElements = options.map((option, index) => {
        const title = option.getName();
        if (index === props.selected) {
            return (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                <li
                    key={title}
                    className="selected"
                    onClick={() => onClick(index)}
                >
                    {title}
                </li>
            );
        }
        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
            <li key={title} onClick={() => onClick(index)}>
                {title}
            </li>
        );
    });
    return (
        <div className="options">
            <ol>{listElements}</ol>
        </div>
    );
}

export default Options;
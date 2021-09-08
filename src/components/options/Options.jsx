import React from 'react';
import './Options.css';

function Options(props) {
    const { options, onClick } = props;
    const listElements = options.map((option, index) => {
        const key = typeof option === 'string' ? option : option.getGame();
        if (index === props.selected) {
            return (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                <li
                    key={key}
                    className="selected"
                    onClick={() => onClick(index)}
                >
                    {key}
                </li>
            );
        }
        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
            <li key={key} onClick={() => onClick(index)}>
                {key}
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

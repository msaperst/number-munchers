import React from 'react';
import './Options.css';

function Options(props) {
    const { options, onClick } = props;
    const listElements = options.map((option, index) => {
        if (index === props.selected) {
            return (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                <li
                    key={option.getGame()}
                    className="selected"
                    onClick={() => onClick(index)}
                >
                    {option.getGame()}
                </li>
            );
        }
        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
            <li key={option.getGame()} onClick={() => onClick(index)}>
                {option.getGame()}
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

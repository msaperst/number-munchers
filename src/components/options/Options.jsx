import React from 'react';
import './Options.css';

function Options(props) {
    const { options } = props;
    const listElements = options.map((option, index) => {
        if (index === props.selected) {
            return (
                <li key={option.getGame()} className="selected">
                    {option.getGame()}
                </li>
            );
        }
        return <li key={option.getGame()}>{option.getGame()}</li>;
    });
    return (
        <div className="options">
            <ol>{listElements}</ol>
        </div>
    );
}

export default Options;

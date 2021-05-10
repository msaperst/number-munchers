import ReactDOM from 'react-dom';
import React from 'react';
import './Menu.css';
import Keyboard from '../keyboard/Keyboard';
import Options from '../options/Options';
import Game from '../game/Game';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
        };
        this.keyDown = this.keyDown.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', (event) => {
            this.keyDown(event.code);
        });
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown);
    }

    keyDown(code) {
        switch (code) {
            case 'Enter':
                this.select();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                this.select(-1);
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                this.select(1);
                break;
            default:
            // do nothing
        }
    }

    select(movement) {
        let { selected } = this.state;
        const { options } = this.props;
        if (movement === undefined) {
            const game = options[selected];
            ReactDOM.render(
                <Game game={game} />,
                document.getElementById('root')
            );
        } else {
            selected += movement;
            if (selected < 0) {
                selected = options.length - 1;
            } else if (selected >= options.length) {
                selected = 0;
            }
            this.setState({ selected });
        }
    }

    render() {
        const { question, options, instructions } = this.props;
        const { selected } = this.state;
        return (
            <div>
                <div className="menu">
                    <div className="text">{question}</div>
                    <Options options={options} selected={selected} />
                    <div className="text">{instructions}</div>
                </div>
                <Keyboard
                    up={() => this.keyDown('ArrowUp')}
                    down={() => this.keyDown('ArrowDown')}
                    left={() => this.keyDown('ArrowLeft')}
                    right={() => this.keyDown('ArrowRight')}
                    enter={() => this.keyDown('Enter')}
                />
            </div>
        );
    }
}

export default Menu;

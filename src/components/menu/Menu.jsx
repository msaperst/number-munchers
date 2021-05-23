import ReactDOM from 'react-dom';
import React from 'react';
import './Menu.css';
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

    clickedOption(option) {
        const { selected } = this.state;
        if (option === selected) {
            this.select();
        } else {
            this.setState({ selected: option });
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
            <div className="all">
                <div className="menu">
                    <div className="text">{question}</div>
                    <Options
                        options={options}
                        selected={selected}
                        onClick={(opt) => this.clickedOption(opt)}
                    />
                    <div className="text">{instructions}</div>
                </div>
            </div>
        );
    }
}

export default Menu;

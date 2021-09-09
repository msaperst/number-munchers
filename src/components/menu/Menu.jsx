import ReactDOM from 'react-dom';
import React from 'react';
import './Menu.css';
import Options from '../options/Options';
// eslint-disable-next-line import/no-cycle
import Play from '../../menus/Play';
import Hall from '../../menus/Hall';
import Info from '../../menus/Info';
// eslint-disable-next-line import/no-cycle
import Option from '../../menus/Option';
import Quit from '../../menus/Quit';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
        };
        this.keyDown = this.keyDown.bind(this);
        this.clickedOption = this.clickedOption.bind(this);
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
            case 'Escape':
                document.removeEventListener('keydown', this.keyDown);
                ReactDOM.render(
                    <Menu
                        question=""
                        options={[
                            new Play(),
                            new Hall(),
                            new Info(),
                            new Option(),
                            new Quit(),
                        ]}
                        instructions="Use Arrows to move, then press Enter"
                        background="opening"
                    />,
                    document.getElementById('root')
                );
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
            document.removeEventListener('keydown', this.keyDown);
            ReactDOM.render(
                options[selected].getScreen(),
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
        const { question, options, instructions, background } = this.props;
        const { selected } = this.state;
        const className = `menu ${background}`;
        return (
            <div className="all">
                <div className={className}>
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
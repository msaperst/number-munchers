import ReactDOM from 'react-dom';
import React from 'react';
import './Menu.css';
import Options from '../options/Options';
import Play from '../../menus/Play';
import Hall from '../../menus/Hall';
import Info from '../../menus/Info';
import Option from '../../menus/Option';
import Quit from '../../menus/Quit';

class Menu extends React.Component {
    static mainMenu() {
        return (
            <Menu
                options={[
                    new Play(),
                    new Hall(),
                    new Info(),
                    new Option(),
                    new Quit(),
                ]}
                instructions="Use Arrows to move, then press Enter"
                extraClass="opening"
                width="w550"
                top="t140"
            />
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
        };
        this.keyDown = this.keyDown.bind(this);
        this.clickedOption = this.clickedOption.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown);
    }

    keyDown(e) {
        const { escape } = this.props;
        switch (e.code) {
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
                if (escape !== undefined) {
                    this.setState({ selected: 0 });
                    ReactDOM.render(escape, document.getElementById('root'));
                }
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
            this.setState({
                selected: options[selected].getSelected
                    ? options[selected].getSelected()
                    : 0,
            });
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
        const {
            title,
            question,
            options,
            instructions,
            extraClass,
            width,
            top,
        } = this.props;
        const { selected } = this.state;
        const menuTitle = title ? (
            <div className="menu-title">{title}</div>
        ) : (
            ''
        );
        return (
            <div className="all">
                {menuTitle}
                <div className={`menu ${extraClass}`}>
                    <div className="text">{question}</div>
                    <Options
                        options={options}
                        selected={selected}
                        width={width}
                        top={top}
                        onClick={(opt) => this.clickedOption(opt)}
                    />
                    {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
                    <div
                        key="go-back"
                        role="button"
                        className="text"
                        onClick={() => this.keyDown({ code: 'Escape' })}
                        onKeyPress={() => this.keyDown({ code: 'Escape' })}
                    >
                        {instructions}
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;

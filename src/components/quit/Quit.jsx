import React from 'react';
import './Quit.css';

class Quit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 1,
        };
        this.keyDown = this.keyDown.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown);
    }

    keyDown(e) {
        const { selected } = this.state;
        switch (e.code) {
            case 'ArrowLeft':
                this.select(2);
                return this.select(0);
            case 'ArrowRight':
                this.select(2);
                return this.select(1);
            case 'Enter':
                return this.select(selected);
            default:
            // do nothing
        }
        return 0;
    }

    select(which) {
        let { selected } = this.state;
        if (selected === which) {
            const { yes, no } = this.props;
            selected ? no() : yes();
        } else {
            selected = which;
            this.setState({ selected });
        }
    }

    render() {
        const { selected } = this.state;
        let yesClass = 'quit-button quit-yes';
        let noClass = 'quit-button quit-no';
        if (selected === 0) {
            yesClass += ' quit-selected';
        } else {
            noClass += ' quit-selected';
        }
        return (
            <div className="quit">
                <br />
                Do you really want to quit?
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <span
                    onClick={() => this.select(0)}
                    onKeyPress={() => this.select(0)}
                    className={yesClass}
                >
                    Yes
                </span>
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <span
                    onClick={() => this.select(1)}
                    onKeyPress={() => this.select(1)}
                    className={noClass}
                >
                    No
                </span>
            </div>
        );
    }
}

export default Quit;

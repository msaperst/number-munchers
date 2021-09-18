import React from 'react';
// eslint-disable-next-line import/no-cycle
import Menu from '../components/menu/Menu';
// eslint-disable-next-line import/no-cycle
import Difficulty from './options/Difficulty';
import Content from './options/Content';
import Hall from './options/Hall';
import Password from './options/Password';
import Joystick from './options/Joystick';
import Calibrate from './options/Calibrate';

class Option {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return 'Options';
    }

    // eslint-disable-next-line class-methods-use-this
    getScreen() {
        return (
            <Menu
                question="Choose an option:"
                options={[
                    new Difficulty(),
                    new Content(),
                    new Hall(),
                    new Password(),
                    new Joystick(),
                    new Calibrate(),
                ]}
                instructions="Use Arrows to move, then press Enter. Escape: Main Menu"
                width="w550"
            />
        );
    }
}

export default Option;

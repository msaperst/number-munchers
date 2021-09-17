// eslint-disable-next-line max-classes-per-file
import React from 'react';
// eslint-disable-next-line import/no-cycle
import Menu from '../../components/menu/Menu';
// eslint-disable-next-line import/no-cycle
import Option from '../Option';

const difficulties = [
    '3rd Grade Easy',
    '3rd Grade Advanced',
    '4th Grade Easy',
    '4th Grade Advanced',
    '5th Grade Easy',
    '5th Grade Advanced',
    '6th Grade Easy',
    '6th Grade Advanced',
    '7th Grade Easy',
    '7th Grade Advanced',
    '8th Grade and Above',
];

class Difficulty extends React.Component {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return 'Set Difficulty Level';
    }

    // eslint-disable-next-line class-methods-use-this
    getScreen() {
        const level = localStorage.getItem('difficulty') || 1;
        return (
            <Menu
                question={`Current Difficulty: ${difficulties[level]}\n\nChoose a level:`}
                options={[
                    new Grade3Easy(),
                    new Grade3Advanced(),
                    new Grade4Easy(),
                    new Grade4Advanced(),
                    new Grade5Easy(),
                    new Grade5Advanced(),
                    new Grade6Easy(),
                    new Grade6Advanced(),
                    new Grade7Easy(),
                    new Grade7Advanced(),
                    new Grade8AndAbove(),
                ]}
                instructions={`Use Arrows to move, then press Enter.\n\nEscape: Options Menu`}
                width="w550"
            />
        );
    }
}

class Difficulties extends React.Component {
    getScreen() {
        localStorage.setItem(
            'difficulty',
            difficulties.indexOf(this.getName())
        );
        return new Option().getScreen();
    }
}

class Grade3Easy extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[0];
    }
}

class Grade3Advanced extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[1];
    }
}

class Grade4Easy extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[2];
    }
}

class Grade4Advanced extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[3];
    }
}

class Grade5Easy extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[4];
    }
}

class Grade5Advanced extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[5];
    }
}

class Grade6Easy extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[6];
    }
}

class Grade6Advanced extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[7];
    }
}

class Grade7Easy extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[8];
    }
}

class Grade7Advanced extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[9];
    }
}

class Grade8AndAbove extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[10];
    }
}

export {
    Grade3Easy,
    Grade3Advanced,
    Grade4Easy,
    Grade4Advanced,
    Grade5Easy,
    Grade5Advanced,
    Grade6Easy,
    Grade6Advanced,
    Grade7Easy,
    Grade7Advanced,
    Grade8AndAbove,
};
export default Difficulty;

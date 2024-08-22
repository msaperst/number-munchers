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
    getSelected() {
        if (localStorage.getItem('difficulty') === null) {
            return 1;
        }
        return parseInt(localStorage.getItem('difficulty'), 10);
    }

    // eslint-disable-next-line class-methods-use-this
    getScreen() {
        const level = this.getSelected();
        return (
            <Menu
                title="Select Difficulty"
                question={
                    <span>
                        <p>Current Difficulty: {difficulties[level]}</p>
                        <p>Choose a level:</p>
                    </span>
                }
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
                escape={new Option().getScreen()}
                extraClass="options-border"
                instructions={
                    <span>
                        <p>Use Arrows to move, then press Enter.</p>
                        <p>Escape: Options Menu</p>
                    </span>
                }
                width="w550"
                top="tn40"
            />
        );
    }

    static getDifficulty(difficulty) {
        switch (parseInt(difficulty, 10)) {
            case 0:
                return Grade3Easy;
            case 1:
                return Grade3Advanced;
            case 2:
                return Grade4Easy;
            case 3:
                return Grade4Advanced;
            case 4:
                return Grade5Easy;
            case 5:
                return Grade5Advanced;
            case 6:
                return Grade6Easy;
            case 7:
                return Grade6Advanced;
            case 8:
                return Grade7Easy;
            case 9:
                return Grade7Advanced;
            case 10:
                return Grade8AndAbove;
            default:
                return Grade3Advanced;
        }
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

    static getInequality() {
        return this.getEquality();
    }

    static getChallenge() {
        return {
            use: true,
        };
    }
}

class Grade3Easy extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[0];
    }

    static getMultiples() {
        return {
            use: false,
            range: { min: 2, max: 5 },
            other: 5,
        };
    }

    static getFactors() {
        return {
            use: false,
            range: { min: 3, max: 20 },
        };
    }

    static getPrimes() {
        return {
            use: false,
            range: { min: 2, max: 20 },
        };
    }

    static getEquality() {
        return {
            use: true,
            range: { min: 1, max: 20 },
            other: ['+', '-'],
        };
    }
}

class Grade3Advanced extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[1];
    }

    static getMultiples() {
        return {
            use: true,
            range: { min: 2, max: 6 },
            other: 5,
        };
    }

    static getFactors() {
        return {
            use: true,
            range: { min: 3, max: 25 },
        };
    }

    static getPrimes() {
        return {
            use: false,
            range: { min: 2, max: 25 },
        };
    }

    static getEquality() {
        return {
            use: true,
            range: { min: 1, max: 25 },
            other: ['+', '-'],
        };
    }
}

class Grade4Easy extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[2];
    }

    static getMultiples() {
        return {
            use: true,
            range: { min: 2, max: 9 },
            other: 5,
        };
    }

    static getFactors() {
        return {
            use: true,
            range: { min: 3, max: 30 },
        };
    }

    static getPrimes() {
        return {
            use: false,
            range: { min: 2, max: 30 },
        };
    }

    static getEquality() {
        return {
            use: true,
            range: { min: 1, max: 30 },
            other: ['+', '-', 'x'],
        };
    }
}

class Grade4Advanced extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[3];
    }

    static getMultiples() {
        return {
            use: true,
            range: { min: 2, max: 11 },
            other: 9,
        };
    }

    static getFactors() {
        return {
            use: true,
            range: { min: 3, max: 40 },
        };
    }

    static getPrimes() {
        return {
            use: false,
            range: { min: 2, max: 40 },
        };
    }

    static getEquality() {
        return {
            use: true,
            range: { min: 1, max: 40 },
            other: ['+', '-', 'x', '÷'],
        };
    }
}

class Grade5Easy extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[4];
    }

    static getMultiples() {
        return {
            use: true,
            range: { min: 2, max: 12 },
            other: 10,
        };
    }

    static getFactors() {
        return {
            use: true,
            range: { min: 3, max: 50 },
        };
    }

    static getPrimes() {
        return {
            use: false,
            range: { min: 2, max: 50 },
        };
    }

    static getEquality() {
        return {
            use: true,
            range: { min: 1, max: 50 },
            other: ['+', '-', 'x', '÷'],
        };
    }
}

class Grade5Advanced extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[5];
    }

    static getMultiples() {
        return {
            use: true,
            range: { min: 2, max: 13 },
            other: 11,
        };
    }

    static getFactors() {
        return {
            use: true,
            range: { min: 3, max: 60 },
        };
    }

    static getPrimes() {
        return {
            use: true,
            range: { min: 2, max: 60 },
        };
    }

    static getEquality() {
        return {
            use: true,
            range: { min: 1, max: 60 },
            other: ['+', '-', 'x', '÷'],
        };
    }
}

class Grade6Easy extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[6];
    }

    static getMultiples() {
        return {
            use: true,
            range: { min: 2, max: 14 },
            other: 12,
        };
    }

    static getFactors() {
        return {
            use: true,
            range: { min: 3, max: 70 },
        };
    }

    static getPrimes() {
        return {
            use: true,
            range: { min: 2, max: 70 },
        };
    }

    static getEquality() {
        return {
            use: true,
            range: { min: 1, max: 70 },
            other: ['+', '-', 'x', '÷'],
        };
    }
}

class Grade6Advanced extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[7];
    }

    static getMultiples() {
        return {
            use: true,
            range: { min: 2, max: 15 },
            other: 13,
        };
    }

    static getFactors() {
        return {
            use: true,
            range: { min: 3, max: 80 },
        };
    }

    static getPrimes() {
        return {
            use: true,
            range: { min: 2, max: 80 },
        };
    }

    static getEquality() {
        return {
            use: true,
            range: { min: 1, max: 80 },
            other: ['+', '-', 'x', '÷'],
        };
    }
}

class Grade7Easy extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[8];
    }

    static getMultiples() {
        return {
            use: true,
            range: { min: 2, max: 16 },
            other: 14,
        };
    }

    static getFactors() {
        return {
            use: true,
            range: { min: 3, max: 90 },
        };
    }

    static getPrimes() {
        return {
            use: true,
            range: { min: 2, max: 90 },
        };
    }

    static getEquality() {
        return {
            use: true,
            range: { min: 1, max: 90 },
            other: ['+', '-', 'x', '÷'],
        };
    }
}

class Grade7Advanced extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[9];
    }

    static getMultiples() {
        return {
            use: true,
            range: { min: 2, max: 17 },
            other: 15,
        };
    }

    static getFactors() {
        return {
            use: true,
            range: { min: 3, max: 100 },
        };
    }

    static getPrimes() {
        return {
            use: true,
            range: { min: 2, max: 100 },
        };
    }

    static getEquality() {
        return {
            use: true,
            range: { min: 1, max: 100 },
            other: ['+', '-', 'x', '÷'],
        };
    }
}

class Grade8AndAbove extends Difficulties {
    // eslint-disable-next-line class-methods-use-this
    getName() {
        return difficulties[10];
    }

    static getMultiples() {
        return {
            use: true,
            range: { min: 2, max: 20 },
            other: 20,
        };
    }

    static getFactors() {
        return {
            use: true,
            range: { min: 3, max: 200 },
        };
    }

    static getPrimes() {
        return {
            use: true,
            range: { min: 2, max: 200 },
        };
    }

    static getEquality() {
        return {
            use: true,
            range: { min: 1, max: 150 },
            other: ['+', '-', 'x', '÷'],
        };
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

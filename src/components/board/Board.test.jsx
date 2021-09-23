import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Board, { getRow, getRows } from './Board.jsx';

const TS = 'touchStart';
const TM = 'touchMove';
const TE = 'touchEnd';

const createClientXYObject = (x, y) => ({
    clientX: x,
    clientY: y,
});
// Create touch event
const cte = ({ x, y }) => ({
    touches: [createClientXYObject(x, y)],
});

describe('<Board/>', () => {
    it('get Empty Small Row', () => {
        const row = getRow(1, 0, []);
        expect(row).toHaveLength(1);
        const square = render(row[0]);
        expect(square.container.querySelector('#c0').textContent).toEqual('');
    });

    it('get Small Row', () => {
        const row = getRow(1, 0, [1]);
        expect(row).toHaveLength(1);
        const square = render(row[0]);
        expect(square.container.querySelector('#c0').textContent).toEqual('1');
    });

    it('get First Row', () => {
        const row = getRow(3, 0, [1, 2, 3, 4, 5, 6]);
        expect(row).toHaveLength(3);
        let square = render(row[0]);
        expect(square.container.querySelector('#c0').textContent).toEqual('1');
        square = render(row[1]);
        expect(square.container.querySelector('#c1').textContent).toEqual('2');
        square = render(row[2]);
        expect(square.container.querySelector('#c2').textContent).toEqual('3');
    });

    it('get Second Row', () => {
        const row = getRow(3, 1, [1, 2, 3, 4, 5, 6]);
        expect(row).toHaveLength(3);
        let square = render(row[0]);
        expect(square.container.querySelector('#c3').textContent).toEqual('4');
        square = render(row[1]);
        expect(square.container.querySelector('#c4').textContent).toEqual('5');
        square = render(row[2]);
        expect(square.container.querySelector('#c5').textContent).toEqual('6');
    });

    it('get Small Board', () => {
        const row = getRows(1, 1, [4]);
        expect(row).toHaveLength(1);
        const square = render(row[0]);
        expect(square.container.querySelector('#c0').textContent).toEqual('4');
        expect(square.container.querySelector('#c1')).not.toBeInTheDocument();
    });

    it('get Medium Board', () => {
        const row = getRows(3, 3, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(row).toHaveLength(3);
        let square = render(row[0]);
        expect(square.container.querySelector('#c0').textContent).toEqual('1');
        expect(square.container.querySelector('#c1').textContent).toEqual('2');
        expect(square.container.querySelector('#c2').textContent).toEqual('3');
        expect(square.container.querySelector('#c3')).not.toBeInTheDocument();
        square = render(row[1]);
        expect(square.container.querySelector('#c3').textContent).toEqual('4');
        expect(square.container.querySelector('#c4').textContent).toEqual('5');
        expect(square.container.querySelector('#c5').textContent).toEqual('6');
        expect(square.container.querySelector('#c6')).not.toBeInTheDocument();
        square = render(row[2]);
        expect(square.container.querySelector('#c6').textContent).toEqual('7');
        expect(square.container.querySelector('#c7').textContent).toEqual('8');
        expect(square.container.querySelector('#c8').textContent).toEqual('9');
        expect(square.container.querySelector('#c9')).not.toBeInTheDocument();
    });

    it('renders a full board without any troggles', () => {
        const square = render(
            <Board
                muncher={{ x: 0, y: 0 }}
                troggles={[]}
                height="5"
                width="6"
                squares={[
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                ]}
            />
        );
        expect(
            square.container.querySelector('.troggle')
        ).not.toBeInTheDocument();
        verifyMuncherAndBoard(square);
    });

    it('renders a full board without anything', () => {
        const square = render(
            <Board
                muncher={{ x: 0, y: 0 }}
                troggles={[{}]}
                height="5"
                width="6"
                squares={[
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                ]}
            />
        );
        expect(
            square.container.querySelector('.troggle')
        ).not.toBeInTheDocument();
        verifyMuncherAndBoard(square);
    });

    function verifyMuncherAndBoard(square) {
        expect(square.container.querySelector('.muncher')).toBeInTheDocument();
        expect(
            square.container.querySelector('.muncher').getBoundingClientRect()
                .left
        ).toEqual(0);
        expect(
            square.container.querySelector('.muncher').getBoundingClientRect()
                .top
        ).toEqual(0);
        for (let x = 0; x < 30; x++) {
            expect(
                parseInt(
                    square.container.querySelector(`#c${x}`).textContent,
                    10
                )
            ).toEqual(x);
        }
        expect(square.container.querySelector('#c30')).not.toBeInTheDocument();
        expect(screen.queryByText('30')).not.toBeInTheDocument();
    }

    it('renders a full board with two troggles', () => {
        const square = render(
            <Board
                muncher={{ x: 0, y: 0 }}
                troggles={[
                    { position: { x: 1, y: 1 }, troggle: 'reggie' },
                    { position: { x: 3, y: 2 }, troggle: 'worker' },
                ]}
                height="5"
                width="6"
                squares={[
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                ]}
            />
        );
        expect(square.container.querySelectorAll('.troggle')).toHaveLength(2);
        expect(
            square.container.querySelectorAll('.troggle')[0].className
        ).toEqual('troggle reggie');
        expect(
            square.container
                .querySelectorAll('.troggle')[0]
                .getBoundingClientRect().left
        ).toEqual(0);
        expect(
            square.container
                .querySelectorAll('.troggle')[0]
                .getBoundingClientRect().right
        ).toEqual(0);
        expect(
            square.container.querySelectorAll('.troggle')[1].className
        ).toEqual('troggle worker');
        expect(
            square.container
                .querySelectorAll('.troggle')[1]
                .getBoundingClientRect().left
        ).toEqual(0);
        expect(
            square.container
                .querySelectorAll('.troggle')[1]
                .getBoundingClientRect().right
        ).toEqual(0);
        verifyMuncherAndBoard(square);
    });

    // TODO - figure out how to simulate swipe (https://github.com/FormidableLabs/react-swipeable/blob/1f983e4e9de92c7faba616bc6c696dd81706ee20/__tests__/useSwipeable.spec.tsx#L62)
    it('recognizes down when swiped down', () => {
        const keyDown = (value) => {
            expect(value).toEqual({ code: 'ArrowDown' });
        };
        const board = render(
            <Board
                muncher={{ x: 0, y: 0 }}
                troggles={[{}]}
                height="5"
                width="6"
                squares={new Array(30).fill(5)}
                movement={{ keyDown }}
            />
        );
        const touchArea = board.container.querySelector('.board');
        swipe(touchArea, 'down');
    });

    it('recognizes up when swiped up', () => {
        const keyDown = (value) => {
            expect(value).toEqual({ code: 'ArrowUp' });
        };
        const board = render(
            <Board
                muncher={{ x: 0, y: 0 }}
                troggles={[{}]}
                height="5"
                width="6"
                squares={new Array(30).fill(5)}
                movement={{ keyDown }}
            />
        );
        const touchArea = board.container.querySelector('.board');
        swipe(touchArea, 'up');
    });

    it('recognizes right when swiped right', () => {
        const keyDown = (value) => {
            expect(value).toEqual({ code: 'ArrowRight' });
        };
        const board = render(
            <Board
                muncher={{ x: 0, y: 0 }}
                troggles={[{}]}
                height="5"
                width="6"
                squares={new Array(30).fill(5)}
                movement={{ keyDown }}
            />
        );
        const touchArea = board.container.querySelector('.board');
        swipe(touchArea, 'right');
    });

    it('recognizes left when swiped left', () => {
        const keyDown = (value) => {
            expect(value).toEqual({ code: 'ArrowLeft' });
        };
        const board = render(
            <Board
                muncher={{ x: 0, y: 0 }}
                troggles={[{}]}
                height="5"
                width="6"
                squares={new Array(30).fill(5)}
                movement={{ keyDown }}
            />
        );
        const touchArea = board.container.querySelector('.board');
        swipe(touchArea, 'left');
    });

    it('recognizes clicking away notification', () => {
        const keyDown = (value) => {
            expect(value).toEqual({ code: 'Space' });
        };
        render(
            <Board
                muncher={{ x: 0, y: 0 }}
                troggles={[{}]}
                height="5"
                width="6"
                notification="1234"
                squares={new Array(30).fill(5)}
                movement={{ keyDown }}
            />
        );
        screen.getByText(/1234/).click();
    });

    it('recognizes clicking on a square', () => {
        const click = (x, y) => {
            expect(x).toEqual(2);
            expect(y).toEqual(2);
        };
        render(
            <Board
                muncher={{ x: 0, y: 0 }}
                troggles={[{}]}
                height="5"
                width="6"
                squares={[
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                ]}
                movement={{ click }}
            />
        );
        screen.getByText('14').click();
    });

    function swipe(touchArea, direction) {
        let movementx = [100, 100, 100, 100, 100];
        let movementy = [100, 100, 100, 100, 100];
        switch (direction) {
            case 'down':
                movementy = [100, 125, 150, 175, 200];
                break;
            case 'up':
                movementy = [200, 175, 150, 125, 100];
                break;
            case 'right':
                movementx = [100, 125, 150, 175, 200];
                break;
            case 'left':
                movementx = [200, 175, 150, 125, 100];
                break;
            default:
            // DO NOTHING
        }
        fireEvent[TS](touchArea, cte({ x: movementx[0], y: movementy[0] }));
        fireEvent[TM](touchArea, cte({ x: movementx[1], y: movementy[1] }));
        fireEvent[TM](touchArea, cte({ x: movementx[2], y: movementy[2] }));
        fireEvent[TM](touchArea, cte({ x: movementx[3], y: movementy[3] }));
        fireEvent[TM](touchArea, cte({ x: movementx[4], y: movementy[4] }));
        fireEvent[TE](touchArea, cte({}));
    }
});

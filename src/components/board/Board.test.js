import Board, {getRow, getRows} from './Board.js'
import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

describe('<Board/>', () => {
    it('Get Empty Small Row', () => {
        const row = getRow(1, 0, []);
        expect(row.length).toEqual(1);
        const square = render(row[0]);
        expect(square.container.querySelector('#c0').textContent).toEqual('');
    });

    it('Get Small Row', () => {
        const row = getRow(1, 0, [1]);
        expect(row.length).toEqual(1);
        const square = render(row[0]);
        expect(square.container.querySelector('#c0').textContent).toEqual('1');
    });

    it('Get First Row', () => {
        const row = getRow(3, 0, [1, 2, 3, 4, 5, 6]);
        expect(row.length).toEqual(3);
        let square = render(row[0]);
        expect(square.container.querySelector('#c0').textContent).toEqual('1');
        square = render(row[1]);
        expect(square.container.querySelector('#c1').textContent).toEqual('2');
        square = render(row[2]);
        expect(square.container.querySelector('#c2').textContent).toEqual('3');
    });

    it('Get Second Row', () => {
        const row = getRow(3, 1, [1, 2, 3, 4, 5, 6]);
        expect(row.length).toEqual(3);
        let square = render(row[0]);
        expect(square.container.querySelector('#c3').textContent).toEqual('4');
        square = render(row[1]);
        expect(square.container.querySelector('#c4').textContent).toEqual('5');
        square = render(row[2]);
        expect(square.container.querySelector('#c5').textContent).toEqual('6');
    });

    it('Get Small Board', () => {
        const row = getRows(1, 1, [4]);
        expect(row.length).toEqual(1);
        let square = render(row[0]);
        expect(square.container.querySelector('#c0').textContent).toEqual('4');
        expect(square.container.querySelector('#c1')).not.toBeInTheDocument();
    });

    it('Get Medium Board', () => {
        const row = getRows(3, 3, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(row.length).toEqual(3);
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

    it('Full Board', () => {
        let square = render(<Board muncher={{x: 0, y: 0}} height="5" width="6"
                                   squares={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]}/>);
        expect(square.container.querySelector('.muncher')).toBeInTheDocument();
        expect(square.container.querySelector('.muncher').getBoundingClientRect().left).toEqual(0);
        expect(square.container.querySelector('.muncher').getBoundingClientRect().top).toEqual(0);
        for (let x = 0; x < 30; x++) {
            expect(parseInt(square.container.querySelector('#c' + x).textContent)).toEqual(x);
        }
        expect(square.container.querySelector('#c30')).not.toBeInTheDocument();
        expect(screen.queryByText('30')).not.toBeInTheDocument();
    });
});
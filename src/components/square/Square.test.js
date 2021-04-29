import Square from "./Square";
import '@testing-library/jest-dom';
import {render} from "@testing-library/react";

describe('<Square/>', () => {
    it('Empty Square', () => {
        const square = render(<Square/>);
        expect(square.container.querySelector('#c0')).toEqual(null)
    });

    it('Get Bad Value', () => {
        const square = render(<Square cell='0'/>);
        expect(square.container.querySelector('#c0').textContent).toEqual('')
    });

    it('Get Good Value', () => {
        const square = render(<Square cell='0' value='5'/>);
        expect(square.container.querySelector('#c0').textContent).toEqual('5')
    });
});
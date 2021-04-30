import {GetMultiple, IsMultiple} from "./Multiples";

describe('Multiples', () => {
    it('Force 0', () => {
        expect(GetMultiple(0)).toEqual(0);
    });

    it('Ensure nothing lower than 0', () => {
        for (let x = 0; x < 100; x++) {
            expect(GetMultiple(5)).toBeGreaterThanOrEqual(0);
        }
    });

    it('Ensure nothing greater than 10x', () => {
        for (let x = 0; x < 100; x++) {
            expect(GetMultiple(5)).toBeLessThanOrEqual(50);
        }
    });

    it('Verify some simple factors', () => {
        expect(IsMultiple(5, 100)).toEqual(true);
        expect(IsMultiple(5, 0)).toEqual(true);
        expect(IsMultiple(7, 93)).toEqual(false);
        expect(IsMultiple(1, 93)).toEqual(true);
    })
});
import Multiples from "./Multiples";


test('Force 0', () => {
    expect(Multiples(0)).toEqual(0);
});

test('Ensure nothing lower than 0', () => {
    for (let x = 0; x < 100; x++) {
        expect(Multiples(5)).toBeGreaterThanOrEqual(0);
    }
});

test('Ensure nothing greater than 10x', () => {
    for (let x = 0; x < 100; x++) {
        expect(Multiples(5)).toBeLessThanOrEqual(50);
    }
});
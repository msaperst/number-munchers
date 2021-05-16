import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Troggle, {
    addTroggle,
    initializeTroggle,
    moveTroggles,
} from './Troggle';

describe('<Troggle/>', () => {
    it('renders proper class', () => {
        const troggle = render(
            <Troggle position={{ x: 1, y: 1 }} troggle="happy" />
        );
        expect(troggle.container.firstChild.className).toEqual('troggle happy');
    });

    it('aligns', () => {
        const troggle = render(
            <Troggle position={{ x: 0, y: 0 }} troggle="happy" />
        );
        expect(troggle.container.firstChild.style.left).toEqual('0px');
        expect(troggle.container.firstChild.style.top).toEqual('0px');
    });

    it('can not move when no troggles exist', () => {
        expect(moveTroggles([], 5, 4)).toEqual([]);
    });

    it('can not move a "coming soon" troggle', () => {
        expect(moveTroggles([{}], 5, 4)).toEqual([{}]);
    });

    it('moves a troggle', () => {
        const troggles = [
            {
                position: { x: 1, y: 1 },
                direction: { x: 1, y: 1 },
            },
        ];
        const movedTroggles = moveTroggles(troggles, 5, 5);
        expect(movedTroggles).toHaveLength(1);
        expect(movedTroggles[0].position.x).toEqual(2);
        expect(movedTroggles[0].position.y).toEqual(2);
    });

    it('removes troggle too far left', () => {
        const troggles = [
            {
                position: { x: 0, y: 1 },
                direction: { x: -1, y: 0 },
            },
        ];
        expect(moveTroggles(troggles, 5, 5)).toHaveLength(0);
    });

    it('removes troggle too far right', () => {
        const troggles = [
            {
                position: { x: 4, y: 1 },
                direction: { x: 1, y: 0 },
            },
        ];
        expect(moveTroggles(troggles, 5, 5)).toHaveLength(0);
    });

    it('removes troggle too far up', () => {
        const troggles = [
            {
                position: { x: 4, y: 0 },
                direction: { x: 0, y: -1 },
            },
        ];
        expect(moveTroggles(troggles, 5, 5)).toHaveLength(0);
    });

    it('removes troggle too far down', () => {
        const troggles = [
            {
                position: { x: 4, y: 4 },
                direction: { x: 0, y: 1 },
            },
        ];
        expect(moveTroggles(troggles, 5, 5)).toHaveLength(0);
    });

    it('moves one troggle, removes another, ignores a coming soon', () => {
        const troggle1 = {
            position: { x: 0, y: 1 },
            direction: { x: -1, y: 1 },
        };
        const troggle2 = {
            position: { x: 4, y: 4 },
            direction: { x: -1, y: -1 },
        };
        const troggles = [troggle1, troggle2, {}];
        const movedTroggles = moveTroggles(troggles, 5, 5);
        expect(movedTroggles).toHaveLength(2);
        expect(movedTroggles[0].position.x).toEqual(3);
        expect(movedTroggles[0].position.y).toEqual(3);
        expect(movedTroggles[1]).toEqual({});
    });

    it('returns a new troggle with an x greater than or equal to 0', () => {
        for (let x = 0; x < 100; x++) {
            expect(initializeTroggle(5, 5).position.x).toBeGreaterThanOrEqual(
                0
            );
        }
    });

    it('returns a new troggle with an x less than width', () => {
        for (let x = 0; x < 100; x++) {
            expect(initializeTroggle(5, 1).position.x).toBeLessThan(5);
            expect(initializeTroggle(1, 5).position.x).toEqual(0);
        }
    });

    it('returns a new troggle with an y greater than or equal to 0', () => {
        for (let x = 0; x < 100; x++) {
            expect(initializeTroggle(5, 5).position.y).toBeGreaterThanOrEqual(
                0
            );
        }
    });

    it('returns a new troggle with an y less than height', () => {
        for (let x = 0; x < 100; x++) {
            expect(initializeTroggle(1, 5).position.y).toBeLessThan(5);
            expect(initializeTroggle(5, 1).position.y).toEqual(0);
        }
    });

    it('only returns edge values', () => {
        for (let x = 0; x < 100; x++) {
            const troggle = initializeTroggle(5, 5);
            const trogglePosition = troggle.position.y * 5 + troggle.position.x;
            expect(trogglePosition).not.toEqual(6);
            expect(trogglePosition).not.toEqual(7);
            expect(trogglePosition).not.toEqual(8);
            expect(trogglePosition).not.toEqual(11);
            expect(trogglePosition).not.toEqual(12);
            expect(trogglePosition).not.toEqual(13);
            expect(trogglePosition).not.toEqual(16);
            expect(trogglePosition).not.toEqual(17);
            expect(trogglePosition).not.toEqual(18);
        }
    });

    it('has correct starting direction', () => {
        for (let x = 0; x < 100; x++) {
            const troggle = initializeTroggle(5, 5);
            if (troggle.position.x === 0) {
                expect(troggle.direction).toEqual({ x: 1, y: 0 });
            } else if (troggle.position.x === 4) {
                expect(troggle.direction).toEqual({ x: -1, y: 0 });
            } else if (troggle.position.y === 0) {
                expect(troggle.direction).toEqual({ x: 0, y: 1 });
            } else if (troggle.position.y === 4) {
                expect(troggle.direction).toEqual({ x: 0, y: -1 });
            } else {
                expect(false).toEqual(true);
            }
        }
    });

    it('does nothing', () => {
        for (let x = 0; x < 100; x++) {
            const addedTroggle = addTroggle([], 0, 5, 5);
            expect(addedTroggle.troggles).toHaveLength(0);
            expect(addedTroggle.status).toEqual('');
        }
    });

    it('initializes "coming soon" troggles', () => {
        const addedTroggle = addTroggle([{}], 2, 5, 5);
        expect(addedTroggle.troggles).toHaveLength(1);
        expect(addedTroggle.troggles[0].position.x).toBeGreaterThanOrEqual(0);
        expect(addedTroggle.troggles[0].direction.x).toBeGreaterThanOrEqual(-1);
        expect(addedTroggle.status).toEqual('');
    });

    it('adds one troggle on level 1', () => {
        let troggles = [];
        for (let x = 0; x < 100; x++) {
            troggles = addTroggle(troggles, 1, 5, 5).troggles;
        }
        expect(troggles).toHaveLength(1);
    });

    it('adds one troggle on level 2', () => {
        let troggles = [];
        for (let x = 0; x < 100; x++) {
            troggles = addTroggle(troggles, 2, 5, 5).troggles;
        }
        expect(troggles).toHaveLength(1);
    });

    it('adds two troggles on level 3', () => {
        let troggles = [];
        for (let x = 0; x < 100; x++) {
            troggles = addTroggle(troggles, 3, 5, 5).troggles;
        }
        expect(troggles).toHaveLength(2);
    });
});

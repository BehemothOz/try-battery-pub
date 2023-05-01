import type { Circle } from '../Circle';

export const getDistance = (c1: Circle, c2: Circle) => {
    const x = c2.location.x - c1.location.x;
    const y = c2.location.y - c1.location.y;

    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};
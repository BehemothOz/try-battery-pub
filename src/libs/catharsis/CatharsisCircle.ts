import { Vector } from './Vector';
import { Circle } from './Circle';
import type { Bridge } from './types';
import { getColorByType } from './utils/color'

const VEL_X = 0.6;
const VEL_Y = 0.5;

export class CatharsisCircle extends Circle {
    velocity: Vector;
    type: Bridge;

    constructor(location: Vector, radius: number, type: Bridge) {
        super(location, radius, getColorByType(type));

        const vx = Math.random() * (VEL_X * 2) - VEL_X;
        const vy = Math.random() * (VEL_Y * 2) - VEL_Y;

        this.velocity = new Vector(vx, vy);
        this.type = type;
    }

    checkCollisionWalls(startX: number, endX: number, startY: number, endY: number) {
        if (this.location.x > endX - this.radius || this.location.x < startX + this.radius) {
            this.velocity.x = this.velocity.x * -1;
        }

        if (this.location.y > endY - this.radius || this.location.y < startY + this.radius) {
            this.velocity.y = this.velocity.y * -1;
        }
    }

    checkCollision(c: Circle) {
        return false;
    }

    update() {
        this.location.add(this.velocity);
    }
}
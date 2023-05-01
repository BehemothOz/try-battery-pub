import type { Vector } from './Vector';

export class Circle {
    location: Vector;
    radius: number;
    color: string;

    constructor(location: Vector, radius: number, color: string) {
        this.location = location;
        this.radius = radius;
        this.color = color;
    }

    display(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(${this.color}, 0.8)`;
        ctx.fill();
        ctx.closePath();
    }
}

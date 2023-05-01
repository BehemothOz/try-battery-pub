import type { Vector } from './Vector';

export class Line {
    start: Vector;
    end: Vector;
    color: string;
    opacity: number;

    constructor(start: Vector, end: Vector, color: string, opacity: number) {
        this.start = start;
        this.end = end;
        this.color = color;
        this.opacity = opacity;
    }

    display(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.stroke();
    }
}
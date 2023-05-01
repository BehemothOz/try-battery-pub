import { Vector } from '../catharsis/Vector';

/*
    Для экспериментов

    https://stackoverflow.com/questions/36552084/realistic-ball-collision-with-different-ball-mass-small-balls-stop-the-large-o
*/

export class ElasticCircle {
    location: Vector;
    velocity: number; // only x
    mass: number;
    radius: number;
    color: string;

    constructor(x: number, y: number, mass: number, radius: number, velocity: number, color: string) {
        this.location = new Vector(x, y);
        this.velocity = velocity;

        this.mass = mass;
        this.radius = radius;

        this.color = color;
    }

    /*
        Only X
    */
    checkCollisionWalls(startX: number, endX: number) {
        if (this.location.x > endX - this.radius || this.location.x < startX + this.radius) {
            this.velocity = this.velocity * -1;
        }
    }

    checkCollision(c: ElasticCircle) {
        const v1_before = this.velocity;
        const v2_before = c.velocity;

        const v1_after = (v1_before * (this.mass - c.mass) + 2 * c.mass * v2_before) / (this.mass + c.mass);
        const v2_after = (v2_before * (c.mass - this.mass) + 2 * this.mass * v1_before) / (this.mass + c.mass);

        this.velocity = v1_after;
        c.velocity = v2_after;
    }

    update() {
        // this.location.add(this.velocity);
        this.location.x = this.location.x + this.velocity;
    }

    display(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

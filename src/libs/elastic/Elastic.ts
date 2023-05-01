import { Canvas } from './Canvas';
import { ElasticCircle } from './ElasticCircle';

interface ElasticOptions {
    container: HTMLDivElement;
}

const getDistance = (c1: ElasticCircle, c2: ElasticCircle) => {
    const x = c2.location.x - c1.location.x;
    const y = c2.location.y - c1.location.y;

    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};

/*
    Links (about collisions):
    https://joshbradley.me/object-collisions-with-canvas/
    https://stackoverflow.com/questions/73364881/finding-collision-between-two-balls

    https://gist.github.com/christopher4lis/f9ccb589ee8ecf751481f05a8e59b1dc
    https://www.youtube.com/watch?v=KrbNkCkeRGg
    https://www.youtube.com/watch?v=789weryntzM&t=1410s

    Интересно?
    https://openprocessing.org/sketch/1174676
*/

/*
    one-dimensional collision

    https://en.wikipedia.org/wiki/Elastic_collision
*/

export class Elastic {
    canvas: Canvas;
    circles: ElasticCircle[];

    constructor(options: ElasticOptions) {
        const { container } = options;

        this.canvas = new Canvas(container);
        this.circles = [];

        const m1 = 5;
        const m2 = 1;

        const r1 = 8 * m1;
        const r2 = 8 * m2;

        const v1 = 3;
        const v2 = 1;

        const b1 = new ElasticCircle(0 + r1, this.canvas.height / 2, m1, r1, v1, '#ef8711');
        const b2 = new ElasticCircle(this.canvas.width - r2, this.canvas.height / 2, m2, r2, v2, '#b34040');

        this.circles.push(b1, b2);

        this.animate = this.animate.bind(this);
        this.animate();
    }

    checkCollisions() {
        for (let i = 0; i < this.circles.length; i += 1) {
            for (let j = i + 1; j < this.circles.length; j += 1) {
                const c1 = this.circles[i];
                const c2 = this.circles[j];

                if (c1 === c2) continue;

                const distance = getDistance(c1, c2);
                // console.log('distance', distance)
                // console.log('distance + rad', distance + c1.radius + c2.radius)
                if (distance <= c1.radius + c2.radius) {
                    c1.checkCollision(c2);
                    console.log('ooooppppsss')
                }
            }
        }
    }

    update() {
        for (const circle of this.circles) {
            circle.checkCollisionWalls(0, this.canvas.width);
            circle.update();
        }
    }

    display() {
        this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const circle of this.circles) {
            circle.display(this.canvas.ctx);
        }
    }

    animate() {
        this.update();
        this.display();

        this.checkCollisions()

        requestAnimationFrame(this.animate);
    }

    destroy() {
        this.canvas.destroy();
    }
}

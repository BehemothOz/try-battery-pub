import type { Regard } from 'types';

import { Canvas } from './Canvas';
import { CatharsisCircle } from './CatharsisCircle';
import { Line } from './Line';
import { Vector } from './Vector';

import { getDistance } from './utils/distance';
import { randomX, randomY } from './utils/random';
import { getRadius } from './utils/radius';

interface CatharsisOptions {
    container: HTMLDivElement;
}

/*
    conf variables:
    - distance
    - radius ?

    colors?: { success?: string, failure?: string }
*/

export class Catharsis {
    canvas: Canvas;
    circles: CatharsisCircle[];

    constructor(options: CatharsisOptions) {
        const { container } = options;

        this.canvas = new Canvas(container);
        this.circles = [];

        this.animate = this.animate.bind(this);
    }

    addCircle(item: Regard) {
        const circle = this._generateCircle(item);
        this.circles.push(circle);
    }

    update() {
        for (const circle of this.circles) {
            circle.checkCollisionWalls(0, this.canvas.width, 0, this.canvas.height);
            circle.update();
        }
    }

    displayConnections() {
        for (let i = 0; i < this.circles.length; i += 1) {
            for (let j = i + 1; j < this.circles.length; j += 1) {
                const c1 = this.circles[i];
                const c2 = this.circles[j];

                if (c1.type !== c2.type) continue;

                const distance = getDistance(c1, c2);

                if (distance > 80) continue;

                const start = new Vector(c1.location.x, c1.location.y);
                const end = new Vector(c2.location.x, c2.location.y);

                const opacity = 1 - distance / 80;

                const connection = new Line(start, end, c1.color, opacity);
                connection.display(this.canvas.ctx);
            }
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

        this.displayConnections();

        requestAnimationFrame(this.animate);
    }

    init(items: Regard[]) {
        this._generateCircles(items);

        this.animate();
        this.displayConnections();
    }

    destroy() {
        this.canvas.destroy();
    }

    _generateCircle(item: Regard) {
        /*
            TODO: придумать работу с радиусом.
            Пока решение такое: чем больше элементов, тем меньше радиус круга.
        */
        let radius = getRadius(this.circles.length);

        const location = new Vector(randomX(this.canvas.width, radius), randomY(this.canvas.height, radius));

        const circle = new CatharsisCircle(location, radius, item.action);

        return circle;
    }

    _generateCircles(items: Regard[]) {
        const ln = items.length;

        for (let i = 0; i < ln; i += 1) {
            const circle = this._generateCircle(items[i]);

            /*
                Генерация элементов, которые не будут перекрывать друг друга
                TODO: возможно, понадобится в дальнейшем.
            */
            // if (this.circles.length !== 0) {
            //     for (let j = 0; j < this.circles.length; j += 1) {
            //         const circle = this.circles[j];

            //         const distance = getDistance(point.x, point.y, circle.location.x, circle.location.y);

            //         if (distance < radius + circle.radius) {
            //             point = new Vector(randomX(this.canvas.width, radius), randomY(this.canvas.height, radius));
            //             j = -1;
            //         }
            //     }
            // }

            this.circles.push(circle);
        }
    }
}

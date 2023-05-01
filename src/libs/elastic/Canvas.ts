const getCanvasRenderingContext2D = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
    const context = canvas.getContext('2d');

    if (context === null) {
        throw new Error('This browser does not support 2-dimensional canvas rendering contexts.');
    }

    return context;
};

export class Canvas {
    canvas!: HTMLCanvasElement;
    ctx!: CanvasRenderingContext2D;

    width!: number;
    height!: number;

    constructor(container: HTMLDivElement) {
        this.create(container);

        /*
            TODO: add resize event
        */
    }

    create(container: HTMLDivElement) {
        this.canvas = document.createElement('canvas');
        this.ctx = getCanvasRenderingContext2D(this.canvas);

        this.canvas.width = this.width = 400;
        this.canvas.height = this.height = 400;

        this.canvas.style.background = '#000';

        container.append(this.canvas);
    }

    /*
        Уничтожить холст, отписаться от всех событий
    */
    destroy() {
        this.canvas.remove();
    }
}

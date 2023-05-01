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

        this.fitToContainer(container);

        /*
            TODO: При изменении обрезается часть изображения. Надо что то с этим сделать.
            TODO: Может быть пересоздавать canvas?
        */
        globalThis.addEventListener('resize', () => {
            this.fitToContainer(container);
        });
    }

    create(container: HTMLDivElement) {
        this.canvas = document.createElement('canvas');
        this.ctx = getCanvasRenderingContext2D(this.canvas);

        this.canvas.style.background = 'transparent';

        container.append(this.canvas);
    }

    fitToContainer(container: HTMLDivElement) {
        this.canvas.width = this.width = container.offsetWidth;
        this.canvas.height = this.height = container.offsetHeight;
    }

    /*
        Уничтожить холст, отписаться от всех событий
    */
    destroy() {
        this.canvas.remove();
    }
}

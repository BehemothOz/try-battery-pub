export class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    /*
        Сложение векторов
    */
    add(v: Vector) {
        this.x = this.x + v.x;
        this.y = this.y + v.y;
    }
    /*
        Вычитание векторов
    */
    subtract(v: Vector) {
        this.x = this.x - v.x;
        this.y = this.y - v.y;
    }
    /*
        Умножение (увеличение вектора) на скаляр
    */
    multiply(scalar: number) {
        this.x = this.x * scalar;
        this.y = this.y * scalar;
    }
    /*
        Получить величину (или длину) вектора
    */
    get magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}

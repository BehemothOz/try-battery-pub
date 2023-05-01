type randomFunc = (min: number, max: number) => number;

export const random: randomFunc = function (min, max) {
    let rand = Math.random();

    if (min > max) {
        const tmp = min;
        min = max;
        max = tmp;
    }

    return rand * (max - min) + min;
};

export const randomX = (width: number, radius: number) => {
    return random(radius, width - radius);
};

export const randomY = (height: number, radius: number) => {
    return random(radius, height - radius);
};
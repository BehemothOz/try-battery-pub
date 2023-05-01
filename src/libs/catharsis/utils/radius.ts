const BIG = 12;
const NORMAL = 8;
const SMALL = 4;
const EXTRA_SMALL = 2;

export const getRadius = (totalCount: number) => {
    let radius = BIG;

    if (totalCount >= 10 && totalCount < 19) {
        radius = NORMAL;
    }

    if (totalCount >= 20 && totalCount < 49) {
        radius = SMALL;
    }

    if (totalCount >= 50) {
        radius = EXTRA_SMALL;
    }

    return radius;
}
/*
    Возвращает размер localStorage
*/
export const localStorageSize = () => {
    let lsTotal = 0;
    let xLen = 0;

    for (const x in localStorage) {
        if (!localStorage.hasOwnProperty(x)) continue;

        xLen = (localStorage[x].length + x.length) * 2;
        lsTotal += xLen;
    }

    return (lsTotal / 1024).toFixed(2);
};

// console.log(`size: ${localStorageSize()}kb`);
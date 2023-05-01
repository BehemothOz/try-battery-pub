import { useEffect, useState } from 'react';

/*
    About Battery API:
    https://kentcdodds.com/blog/stop-using-isloading-booleans
    https://github.com/max-programming/battery-info-typescript/blob/master/ts/app.ts
    https://archakov.im/post/working-with-the-javascript-api-battery
    https://stackoverflow.com/questions/47831741/property-share-does-not-exist-on-type-navigator
*/

export interface BatteryType {
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    level: number;
    onchargingchange: number | null;
    onchargingtimechange: number | null;
    ondischargingtimechange: number | null;
    onlevelchange: number | null;
}

function useBattery() {
    const [level, setLevel] = useState(0);
    const [isCharging, setIsCharging] = useState(false);

    useEffect(() => {
        // TODO: check if exist
        const getBatteryManager = async () => {
            // @ts-ignore
            const batteryManager = await navigator.getBattery();
            const { level, charging } = batteryManager;

            setLevel(level);
            setIsCharging(charging);

            // @ts-ignore
            batteryManager.onlevelchange = event => {
                const { target } = event;
                setLevel(target.level);
            };

            // @ts-ignore
            batteryManager.onchargingchange = event => {
                const { target } = event;
                setIsCharging(target.charging);
            };
        };

        getBatteryManager();
    }, []);

    return { level: level * 100, isCharging };
}

export const Battery = () => {
    const { level, isCharging } = useBattery();

    return (
        <div className="bg-indigo-500 dark:bg-green-500">
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
            <div className="p-2">
                <span className="text-blue-500">level</span>: <i>{level}</i>
            </div>
            <div className="p-2 pt-0">
                <span className="text-orange-500">isCharging</span>: <i>{String(isCharging)}</i>
            </div>
        </div>
    );
};

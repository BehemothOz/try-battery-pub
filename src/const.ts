/*
    Local Storage keys
*/
export const LS_STATUS_KEY = 'battery:status';

/*
    Geometry
*/
export const APP_BAR_HEIGHT = 56;

/*
    APP STATUSES
*/
export const appStatus = {
    STARTING: 'starting',
    RUNNING: 'running',
    LOST: 'lost',
} as const;


type Keys = keyof typeof appStatus;
type Values = typeof appStatus[Keys];

export type AppStatus = Values;

type Scheme = {
    [key in AppStatus]: {
        nextStatus: AppStatus
    }
}

export const scheme: Scheme = {
    [appStatus.STARTING]: {
        nextStatus: appStatus.RUNNING,
    },
    [appStatus.RUNNING]: {
        nextStatus: appStatus.LOST,
    },
    [appStatus.LOST]: {
        nextStatus: appStatus.STARTING,
    },
};

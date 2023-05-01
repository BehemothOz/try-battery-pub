export type RegardAction = 'up' | 'dump';

export interface Regard {
    value: number;
    timestamp: number;
    action: RegardAction;
}

export interface Record {
    peak: number;
    current: number;
    lives: number;
}

export interface RegardState {
    regards: Regard[];
    record: Record;
}

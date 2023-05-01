import { FC, createContext, useContext } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';

import type { RegardState, Regard, Record, RegardAction } from 'types';

interface ValueContext {
    lastRegard: Regard | null;
    regards: Regard[];
    record: Record;
}

interface ActionOptions {
    callAfter?: (item: Regard) => void;
}

interface ActionsContext {
    add: (value: number, options: ActionOptions) => void;
    reset: (options: ActionOptions) => void;
}

const MAX_LIVES = 5;

const defaultRecord = { peak: 0, current: 0, lives: 3 };

const defaultValueContext = {
    lastRegard: null,
    regards: [],
    record: defaultRecord,
};

const defaultState = {
    regards: [],
    record: defaultRecord,
};

const RegardContext = createContext<ValueContext>(defaultValueContext);
const RegardActionsContext = createContext<ActionsContext>({} as ActionsContext);

const createRegard = (value: number, action: RegardAction): Regard => {
    const regard = {
        value,
        action,
        timestamp: Date.now(),
    };

    return regard;
};

const updateRecord = (current: number, record: Record): Record => {
    const lives = current % 5 === 0 && record.lives < MAX_LIVES ? record.lives + 1 : record.lives;

    const updatedRecord = {
        peak: record.peak >= current ? record.peak : current,
        current: current,
        lives,
    };

    return updatedRecord;
};

const resetRecord = ({ current, peak, lives }: Record) => {
    const record = {
        peak: current > peak ? current : peak,
        current: 0,
        lives: lives - 1,
    };

    return record;
};

/*
    TODO: перенести все ключи в одно место
*/
export const RegardProvider: FC = ({ children }) => {
    const [state, setState] = useLocalStorage<RegardState>('battery:storage', defaultState);
    const { regards, record } = state;

    const lastRegard = regards.at(-1) ?? null;

    const updateState = (regard: Regard, record: Record) => {
        const updatedRegards = regards.concat(regard);

        setState({ regards: updatedRegards, record });
    };

    const add = (value: number, options: ActionOptions = {}) => {
        const { callAfter } = options;

        const regard = createRegard(value, 'up');
        const updatedRecord = updateRecord(value, record);

        updateState(regard, updatedRecord);

        if (callAfter) {
            callAfter(regard);
        }
    };

    const reset = (options: ActionOptions = {}) => {
        if (lastRegard?.action === 'dump') return;

        const { callAfter } = options;

        const regard = createRegard(0, 'dump');
        const dumpedRecord = resetRecord(record);

        updateState(regard, dumpedRecord);

        if (callAfter) {
            callAfter(regard);
        }
    };

    const contextValue = {
        regards,
        lastRegard,
        record,
    };

    const contextActions = {
        add,
        reset,
    };

    return (
        <RegardContext.Provider value={contextValue}>
            <RegardActionsContext.Provider value={contextActions}>{children}</RegardActionsContext.Provider>
        </RegardContext.Provider>
    );
};

export const useRegard = () => {
    return useContext(RegardContext);
};

export const useRegardActions = () => {
    return useContext(RegardActionsContext);
};

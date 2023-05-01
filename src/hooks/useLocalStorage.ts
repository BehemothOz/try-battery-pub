import { useEffect, useState, Dispatch, SetStateAction, useCallback } from 'react';

type SetStorageValue<T> = Dispatch<SetStateAction<T>>;

export function useLocalStorage<T>(key: string, defaultValue: T): [T, SetStorageValue<T>] {
    /*
        Прочитать значение из localStorage
    */
    const readStorageValue = useCallback((): T => {
        try {
            const value = window.localStorage.getItem(key);

            if (value) return JSON.parse(value) as T;

            return defaultValue;
        } catch (error) {
            console.log('ERROR::JSON_PARSE', key);
            return defaultValue;
        }
    }, [key, defaultValue]);

    const [storageValue, setStorageValue] = useState<T>(readStorageValue);

    useEffect(() => {
        const handler = (event: StorageEvent) => {
            if (event.key !== key) return;

            /*
                ? Есть сомнения, что здесь использование "as" - верное.
            */
            const value = event.newValue as T;
            setStorageValue(value);
        };

        /*
            Если значение по ключу обновилось, обновить и состояние (в открытых вкладках)
        */
        window.addEventListener('storage', handler);

        return () => {
            window.addEventListener('storage', handler);
        };
    }, [key]);

    const setItem: SetStorageValue<T> = useCallback(
        value => {
            try {
                window.localStorage.setItem(key, JSON.stringify(value));
                setStorageValue(value);
            } catch (error) {
                console.log('ERROR::JSON_STRINGIFY stringify');
            }
        },
        [key]
    );

    return [storageValue, setItem];
}

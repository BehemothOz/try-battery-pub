import { FC } from 'react';

/*
    TODO: перенести все ключи в одно место
*/
const oldKeys = ['battery:regards', 'battery:achievement', 'battery:storage', 'battery:storage-update'];

/*
    Это отдельный функционал, перенести в соответствующее место
*/
const deleteKeysFromLocalStorage = (keys: string[]) => {
    for (const key of keys) {
        if (oldKeys.includes(key)) {
            delete localStorage[key];
        }
    }
};

interface StartButtonProps {
    onClick: () => void;
}

export const StartButton: FC<StartButtonProps> = ({ onClick }) => {
    const handleClick = () => {
        const keys = Object.keys(window.localStorage);
        deleteKeysFromLocalStorage(keys);

        onClick && onClick();
    };

    return (
        <button className="" onClick={handleClick}>
            I'm ready
        </button>
    );
};

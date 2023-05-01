import { useRegard } from 'contexts/Regard';
import { HeartIcon } from 'icons';
import { useEffect } from 'react';

interface StatusProps {
    onChange: () => void;
}

/*
    TODO: дубль
*/
const generateLives = (count: number) => {
    return new Array(count).fill(0).map((_, idx) => <HeartIcon key={idx} color="#f91515" />);
};

export const Status = ({ onChange }: StatusProps) => {
    const { record } = useRegard();
    const { lives } = record;

    /*
     * Эта логика не должна здесь находиться
     */
    useEffect(() => {
        if (lives <= 0) onChange();
    }, [lives, onChange]);

    if (lives <= 0) return <span />;

    return <div className="flex">{generateLives(lives)}</div>;
};

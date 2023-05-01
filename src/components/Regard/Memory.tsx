import { useRegard } from 'contexts/Regard';
import { parseTimestampToString } from 'utils/time';

const EMPTY_TEXT = "Oops, it's time to start";

export const Memory = () => {
    const { lastRegard } = useRegard();

    const date = lastRegard?.timestamp;
    const text = date ? parseTimestampToString(date) : EMPTY_TEXT;

    return (
        <div className="flex flex-col items-center">
            <span className="text-slate-500 dark:text-slate-400">Date of last update:</span>
            {text}
        </div>
    );
};

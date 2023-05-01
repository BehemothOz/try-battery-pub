import { useRegard } from 'contexts/Regard';

export const Achievement = () => {
    const { record } = useRegard();

    return (
        <div className="relative flex flex-col items-center">
            <span className="text-slate-500 dark:text-slate-400">Increase the lifetime of a banana</span>
            <span className="uppercase tracking-wide text-lg">
                by <span className="text-orange-500">{record.peak}</span> days
            </span>
        </div>
    );
};

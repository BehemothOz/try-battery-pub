import { useRegard } from 'contexts/Regard';

export const Count = () => {
    const { record } = useRegard();

    return (
        <div className="w-full text-center px-4">
            <span className="text-[10rem] text-slate-900 dark:text-white">{record.current}</span>
        </div>
    );
};

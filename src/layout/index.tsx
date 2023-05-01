import { FC } from 'react';

export const Layout: FC = ({ children }) => {
    return (
        <div className="relative bg-slate-100 dark:bg-slate-800 h-screen">
            <div className="flex flex-col h-full">
                <div className="flex w-full flex-grow">{children}</div>
            </div>
        </div>
    );
};

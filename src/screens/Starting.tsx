import { FC } from 'react';
import { Layout } from 'layout';
import { AppBar } from 'layout/AppBar';
import { StartButton } from 'components/StartButton';
import { HeartIcon } from 'icons';

interface StartingProps {
    onStatusChange: () => void;
}

interface HigherProps {
    className?: string;
}

const generateLives = (count: number) => {
    return new Array(count).fill(0).map((_, idx) => <HeartIcon key={idx} color="#f91515" />);
};

const Higher: FC<HigherProps> = ({ className, children }) => {
    const defaultClasses = 'text-slate-900 dark:text-white';
    const classes = className ? `${defaultClasses} ${className}` : defaultClasses;

    return <span className={classes}>{children}</span>;
};

const GeneralRules = () => {
    return (
        <section className="space-y-2 p-3 text-slate-500 dark:text-slate-400">
            <span className="flex items-center justify-center">
                You have
                <span className="inline-flex mx-1">{generateLives(3)}</span>
                lives
            </span>
            <span className="flex items-center justify-center">
                Every 5 <span className="mx-1 text-slate-900 dark:text-white">successful day</span> adds
                <span className="inline-flex mx-1">{generateLives(1)}</span>
                life.
            </span>
            <span className="flex items-center justify-center">
                Every <Higher className="mx-1">unsuccessful day</Higher> takes
                <span className="inline-flex mx-1">{generateLives(1)}</span>
                life.
            </span>
            <span className="flex items-center justify-center">
                The <Higher className="mx-1">maximum</Higher> value is
                <span className="inline-flex mx-1">{generateLives(5)}</span>.
            </span>
        </section>
    );
};

const ClickRules = () => {
    return (
        <section className="p-3 text-base text-center text-slate-500 dark:text-slate-400">
            You can <Higher className="uppercase">click</Higher> on the button{' '}
            <Higher className="uppercase">once a day</Higher>
        </section>
    );
};

export const Starting = ({ onStatusChange }: StartingProps) => {
    return (
        <Layout>
            <AppBar />
            <section className="flex flex-col w-full h-full justify-around">
                <GeneralRules />
                <ClickRules />
                <StartButton onClick={onStatusChange} />
            </section>
        </Layout>
    );
};

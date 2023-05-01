import type { Regard as RegardType } from 'types';

import { Achievement } from './Achievement';
import { Memory } from './Memory';
import { Count } from './Count';
import { Controls } from './Controls';

interface RegardProps {
    addNewCircle: (item: RegardType) => void;
}

export const Regard = (props: RegardProps) => {
    return (
        <section className="relative flex flex-col h-full justify-around w-full text-center">
            <Achievement />
            <Memory />
            <Count />
            <Controls addNewCircle={props.addNewCircle} />
        </section>
    );
};

import { FC } from 'react';
import { appStatus } from 'const';
import { RegardProvider } from 'contexts/Regard';

import { Starting } from './Starting';
import { Running } from './Running';
import { Lose } from './Lose';

interface ScreenProps {
    status: 'starting' | 'running' | 'lost';
    onStatusChange: () => void;
}

export const Screen: FC<ScreenProps> = ({ status, onStatusChange }) => {
    switch (status) {
        case appStatus.STARTING:
            return <Starting onStatusChange={onStatusChange} />;

        case appStatus.RUNNING:
            return (
                <RegardProvider>
                    <Running onStatusChange={onStatusChange} />
                </RegardProvider>
            );

        case appStatus.LOST:
            return <Lose onStatusChange={onStatusChange} />;

        default:
            return null;
    }
};

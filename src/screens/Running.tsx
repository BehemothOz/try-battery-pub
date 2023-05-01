import { useRef } from 'react'

import { Layout } from 'layout';
import { AppBar } from 'layout/AppBar';
import { Regard } from 'components/Regard';
import { Status } from 'components/Status';
import { CatharsisBackground, CatharsisImperativeHandleType } from 'components/CatharsisBackground';
import { APP_BAR_HEIGHT } from 'const';
import type { Regard as RegardType } from 'types';

interface RunningProps {
    onStatusChange: () => void;
}

/*
    TODO: переключатель добавить, чтобы можно было видеть только фон
*/
export const Running = ({ onStatusChange }: RunningProps) => {
    const ref = useRef<CatharsisImperativeHandleType>(null)

    const addNewCircle = (item: RegardType) => {
        if (ref.current) {
            ref.current.addItem(item);
        }
    }

    return (
        <Layout>
            <AppBar extra={[<Status onChange={onStatusChange} />]} />
            <div className="relative w-full h-full" style={{ paddingTop: APP_BAR_HEIGHT }}>
                <CatharsisBackground ref={ref} />
                <Regard addNewCircle={addNewCircle} />
            </div>
        </Layout>
    );
};

import { useRef, useImperativeHandle, forwardRef } from 'react';
import { Catharsis } from 'libs/catharsis';
import { useRegard } from 'contexts/Regard';
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect';
import type { Regard } from 'types';

export interface CatharsisImperativeHandleType {
    addItem: (item: Regard) => void;
}

export const CatharsisBackground = forwardRef((_, ref) => {
    const { regards } = useRegard();

    console.log(regards);

    const isInitialMount = useRef(true);

    const refContainer = useRef<HTMLDivElement>(null);
    const catharsisRef = useRef<Catharsis>();

    useIsomorphicLayoutEffect(() => {
        if (refContainer.current) {
            console.log('create catharsis');
            catharsisRef.current = new Catharsis({
                container: refContainer.current,
            });
        }

        return () => {
            if (catharsisRef.current) {
                console.log('DESTROY');
                catharsisRef.current.destroy();
            }
        };
    }, []);

    useIsomorphicLayoutEffect(() => {
        if (isInitialMount.current && catharsisRef.current) {
            console.log('INIT');
            catharsisRef.current.init(regards);
        }

        if (isInitialMount.current) {
            isInitialMount.current = false;
        }
    }, [regards]);

    useImperativeHandle(
        ref,
        () => {
            return {
                addItem(item: Regard) {
                    catharsisRef.current?.addCircle(item);
                },
            };
        },
        []
    );

    return <div ref={refContainer} className="absolute inset-0 flex justify-center items-center z-1" />;
});

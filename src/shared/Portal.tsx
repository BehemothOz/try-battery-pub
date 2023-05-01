import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export const Portal: FC = ({ children }) => {
    const portalNode = useRef<HTMLDivElement>(document.createElement('div'));

    useEffect(() => {
        const node = portalNode.current;

        document.body.append(node);
        return () => {
            document.body.removeChild(node);
        };
    }, []);

    return createPortal(children, portalNode.current);
};

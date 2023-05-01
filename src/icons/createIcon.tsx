import { FC, SVGProps, memo } from 'react';

const SvgIcon: FC<SVGProps<SVGSVGElement>> = props => {
    const { fontSize = '1.5rem', viewBox = '0 0 20 20', color = 'inherit', children, ...rest } = props;

    return (
        <svg
            viewBox={viewBox}
            width="1em"
            height="1em"
            fontSize={fontSize}
            color={color}
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
        >
            {children}
        </svg>
    );
};

export const createSvgIcon = (path: React.ReactNode, displayName: string) => {
    const Component: FC<SVGProps<SVGSVGElement>> = props => <SvgIcon {...props}>{path}</SvgIcon>;

    Component.displayName = `${displayName}Icon`;

    return memo(Component);
};

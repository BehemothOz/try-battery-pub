import { FC, ReactNode, Fragment } from 'react';
import { ThemeButton } from 'components/ToggleTheme';
import { APP_BAR_HEIGHT } from 'const';

interface AppBarProps {
    extra?: ReactNode[];
}

export const AppBar: FC<AppBarProps> = ({ extra = [] }) => {
    const position = extra.length ? 'justify-between' : 'justify-end';

    return (
        <div
            className={`absolute w-full top-0 left-0 h-${APP_BAR_HEIGHT} p-3 flex items-center ${position} z-10`}
        >
            {extra.map((element, idx) => (
                <Fragment key={idx}>{element}</Fragment>
            ))}
            <ThemeButton />
        </div>
    );
};

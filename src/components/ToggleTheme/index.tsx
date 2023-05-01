import { useTheme } from 'contexts/Theme';
import { SunIcon, MoonIcon } from 'icons';

const SUN_COLOR = '#fdf705';
const MOON_COLOR = '#1e293b';

export const ThemeButton = () => {
    const { theme, setTheme } = useTheme();

    const isLight = theme === 'light';

    const onClick = () => {
        const value = isLight ? 'dark' : 'light';
        setTheme(value);
    };

    const icon = isLight ? <MoonIcon color={MOON_COLOR} /> : <SunIcon color={SUN_COLOR} />;

    return (
        <button className="p-1" onClick={onClick}>
            {icon}
        </button>
    );
};

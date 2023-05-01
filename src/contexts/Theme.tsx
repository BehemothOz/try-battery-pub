import React, { useEffect, useState, createContext, useContext } from 'react';

/*
    TODO:
    2. использовать новый хук
    4. проверить типы
*/

type UseThemeProps = {
    theme?: string;
    setTheme: (theme: string) => void;
};

type ThemeProviderProps = {
    defaultTheme: string;
};

const ThemeContext = createContext<UseThemeProps>({ setTheme: () => {} });

const THEME_KEY = 'battery:theme';

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider: React.FC<ThemeProviderProps> = props => {
    const { defaultTheme = 'light', children } = props;

    const [theme, setThemeValue] = useState(() => {
        const currentTheme = localStorage.getItem(THEME_KEY) || defaultTheme;
        return currentTheme;
    });

    const setTheme = (value: string) => {
        setThemeValue(value);

        try {
            localStorage.setItem(THEME_KEY, value);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const cb = (event: StorageEvent) => {
            if (event.key !== THEME_KEY) return;
            setThemeValue(event.newValue || defaultTheme);
        };

        window.addEventListener('storage', cb);
        return () => {
            window.removeEventListener('storage', cb);
        };
    }, [defaultTheme]);

    useEffect(() => {
        const $root = document.documentElement;
        $root.classList.add(theme);

        return () => {
            $root.classList.remove(theme);
        };
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

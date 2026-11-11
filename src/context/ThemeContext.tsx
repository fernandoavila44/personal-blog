
'use client';

import {
    createContext,
    useContext,
    useEffect,
    type ReactNode,
} from 'react';

import useLocalStorage from '@/hooks/useLocalStorage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined
);

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme, isReady] = useLocalStorage<Theme>(
        'santidev-theme',
        'light'
    );

    useEffect(() => {
        if (!isReady) return;

        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;
    }, [theme, isReady]);

    const toggleTheme = () => {
        setTheme((currentTheme) =>
            currentTheme === 'light' ? 'dark' : 'light'
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            'useTheme debe utilizarse dentro de ThemeProvider'
        );
    }

    return context;
}

'use client';

import { useState, useEffect } from 'react';
import styles from './ThemeToggle.module.scss';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    // Cargar el tema desde localStorage al montar el componente
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        setTheme(initialTheme);
        applyTheme(initialTheme);
        setMounted(true);
    }, []);

    // Aplicar el tema al DOM
    const applyTheme = (newTheme: Theme) => {
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', newTheme);
    };

    // Alternar el tema
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
    };

    // Evitar rendering antes de que esté montado (previene flashing)
    if (!mounted) {
        return null;
    }

    return (
        <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Cambiar tema"
            title={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
}

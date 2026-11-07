'use client';

import { useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function ThemeToggle() {
    // Estado del tema, guardado automáticamente en localStorage con nuestro hook
    const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

    // Aplica el tema al body cada vez que cambia
    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [theme]);

    // Cambia entre claro y oscuro (el hook ya lo guarda en localStorage)
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro'}
        >
            {theme === 'light' ? '🌙 Oscuro' : '☀️ Claro'}
        </button>
    );
}

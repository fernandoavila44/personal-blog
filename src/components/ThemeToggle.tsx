'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // 1) Cargar tema guardado al iniciar
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme === 'light' || savedTheme === 'dark') {
            setTheme(savedTheme);
        }
    }, []);

    // 2) Aplicar tema al body + guardar
    useEffect(() => {
        if (theme === 'dark') document.body.classList.add('dark');
        else document.body.classList.remove('dark');

        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <button
            onClick={toggleTheme}
            style={{
                padding: '0.5rem 1rem',
                borderRadius: 8,
                border: '1px solid #ccc',
                cursor: 'pointer',
                background: theme === 'dark' ? '#222' : '#fff',
                color: theme === 'dark' ? '#fff' : '#000',
            }}
        >
            {theme === 'light' ? '🌙 Modo oscuro' : '☀️ Modo claro'}
        </button>
    );
}

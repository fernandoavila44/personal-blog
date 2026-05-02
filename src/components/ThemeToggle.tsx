'use client';

import { useState, useEffect } from 'react';
import styles from './ThemeToggle.module.scss';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [mounted, setMounted] = useState(false); // Para evitar problemas de hidratación en SSR

    // Cargar el tema inicial desde localStorage o preferencia del sistema
    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            // BONUS: Detectar preferencia del sistema con window.matchMedia
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        }
    }, []);

    // Aplicar la clase al DOM y guardar en localStorage cada vez que cambie
    useEffect(() => {
        if (!mounted) return;
        
        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
        
        localStorage.setItem('theme', theme);
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    // No renderizar en servidor para evitar error de hidratación (SSR mismatch)
    if (!mounted) {
        return <button className={styles.toggleButton} style={{ visibility: 'hidden' }} aria-hidden="true" />;
    }

    return (
        <button 
            className={`${styles.toggleButton} ${theme === 'dark' ? styles.dark : ''}`}
            onClick={toggleTheme}
            aria-label={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
            title={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
        >
            <span className={styles.icon}>
                {theme === 'light' ? '🌙' : '☀️'}
            </span>
        </button>
    );
}

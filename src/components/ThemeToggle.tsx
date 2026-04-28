'use client';

import { useState, useEffect } from 'react';
import styles from './ThemeToggle.module.scss';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [mounted, setMounted] = useState(false);

    // Cargar tema desde localStorage o usar preferencia del sistema (BONUS)
    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
        
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }
    }, []);

    // Aplicar el tema al body
    useEffect(() => {
        if (!mounted) return;
        
        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [theme, mounted]);

    // Función toggle
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    // Prevenir problemas de hidratación en SSR (Server-Side Rendering)
    if (!mounted) {
        return <button className={styles.toggleBtn} style={{ opacity: 0 }}>🌙</button>;
    }

    return (
        <button 
            className={styles.toggleBtn} 
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
            title={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
        >
            <span className={styles.icon}>
                {theme === 'light' ? '🌙' : '☀️'}
            </span>
        </button>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from './ThemeToggle.module.scss';

/* 
 * EJERCICIO: Implementar toggle de tema claro/oscuro con React Hooks
 * ...
 */

export default function ThemeToggle() {
    // Evitar Hydration Error: el componente debe saber si ya se montó en el cliente
    const [mounted, setMounted] = useState(false);

    // TODO: Implementar useState para el tema
    // En lugar de useState, usamos nuestro nuevo hook avanzado
    const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

    // TODO: Implementar useEffect para cargar tema desde localStorage
    // (Ya lo hace useLocalStorage internamente en su initial state)

    // TODO: Implementar useEffect para aplicar el tema al body
    useEffect(() => {
        setMounted(true);
        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [theme]);

    // TODO: Implementar función toggleTheme
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    // Para evitar errores de hidratación entre Servidor y Cliente,
    // mostramos un estado vacío o neutro antes de montar
    if (!mounted) {
        return <button className={styles.toggleBtn} aria-label="Cargando tema">...</button>;
    }

    return (
        <button className={styles.toggleBtn} onClick={toggleTheme} aria-label="Cambiar tema">
            <span style={{ display: 'none' }}>TODO: Implementar toggle de tema</span>
            {/* TODO: Mostrar icono según el tema */}
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
}

/* PREGUNTAS PARA REFLEXIONAR: ... */
/* BONUS: Mejorar el componente ... */
/* NOTA SOBRE CSS: ... */

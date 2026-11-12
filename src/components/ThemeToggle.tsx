'use client';

import { useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from './ThemeToggle.module.scss';

/*
 * Toggle de tema claro/oscuro.
 * - El estado se persiste con el custom hook useLocalStorage (ejercicio 7),
 *   que internamente lee y guarda en localStorage.
 * - useEffect aplica/remueve la clase 'dark' en el <body> cada vez que cambia el tema.
 */

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
    const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');

    // Aplicar el tema al body cada vez que cambie
    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            type="button"
            className={styles.toggle}
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro'}
            title={theme === 'light' ? 'Tema oscuro' : 'Tema claro'}
        >
            <span className={styles.icon} aria-hidden="true">
                {theme === 'light' ? '🌙' : '☀️'}
            </span>
        </button>
    );
}

/* PREGUNTAS PARA REFLEXIONAR:
 * 
 * 1. ¿Por qué necesitamos dos useEffect diferentes?
 *    Respuesta: Uno para cargar el tema inicial (se ejecuta una vez al montar),
 *    y otro para aplicar el tema cada vez que cambia.
 * 
 * 2. ¿Qué pasa si no usamos useEffect para aplicar el tema?
 *    Respuesta: El tema no se aplicaría al DOM. useState solo maneja el estado
 *    de React, pero no modifica el DOM directamente.
 * 
 * 3. ¿Por qué guardar en localStorage?
 *    Respuesta: Para recordar la preferencia del usuario entre sesiones.
 *    Sin localStorage, el tema se resetearía al recargar la página.
 */

/* BONUS: Mejorar el componente
 * 1. Agregar transición suave al cambiar de tema
 * 2. Detectar preferencia del sistema con window.matchMedia
 * 3. Usar CSS variables para los colores del tema
 * 4. Agregar animación al botón
 */

/* NOTA SOBRE CSS:
 * Para que funcione el tema oscuro, necesitas agregar estilos CSS:
 * 
 * body.dark {
 *   background-color: #1f2937;
 *   color: #f9fafb;
 * }
 * 
 * O mejor aún, usar CSS variables que cambien según la clase .dark
 */

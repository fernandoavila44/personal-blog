'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {

    //Estado del tema
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    //Cargar tema guardado en localStorage
    useEffect(() => {
        const saved = localStorage.getItem('theme') as 'light' | 'dark';
        if (saved) {
            setTheme(saved);
        }
    }, []);

    //Aplicar clase al body cuando cambie el tema
    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [theme]);

    //Función toggle
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className={`themeToggle ${theme === 'dark' ? 'dark' : ''}`}
            aria-label="Cambiar tema"
        >
            <span className="icon sun">☀️</span>
            <span className="icon moon">🌙</span>
            <span className="slider" />
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

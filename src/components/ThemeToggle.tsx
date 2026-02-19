'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {

    const [theme, setTheme] = useState<'light' | 'dark'>(() => {

        if (typeof window === 'undefined') {
            return 'light';
        }

        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';

        if (savedTheme) {
            return savedTheme;
        }

        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        return systemPrefersDark ? 'dark' : 'light';
    });


    // Aplicar tema al body
    useEffect(() => {

        const body = document.body;

        // transición suave
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';

        if (theme === 'dark') {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }

        // guardar preferencia
        localStorage.setItem('theme', theme);

    }, [theme]);


    // Toggle
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };


    return (
        <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.25s ease'
            }}
        >
            {theme === 'light' ? (
                <>
                    🌙 <span>Modo oscuro</span>
                </>
            ) : (
                <>
                    ☀️ <span>Modo claro</span>
                </>
            )}
        </button>
    );
}


// import { useState, useEffect } from 'react';
// import styles from './ThemeToggle.module.scss';

/* 
 * EJERCICIO: Implementar toggle de tema claro/oscuro con React Hooks
 * 
 * CONCEPTOS A APRENDER:
 * - useState: Manejo de estado
 * - useEffect: Efectos secundarios y sincronización
 * - localStorage: Persistencia de datos en el navegador
 * - Manipulación del DOM
 * 
 * PASOS A SEGUIR:
 * 
 * 1. Crear estado para el tema
 *    - useState con valores 'light' o 'dark'
 *    - Valor inicial desde localStorage o 'light'
 * 
 * 2. Implementar función toggle
 *    - Cambiar entre 'light' y 'dark'
 *    - Guardar preferencia en localStorage
 * 
 * 3. Usar useEffect para aplicar el tema
 *    - Agregar/remover clase 'dark' al body
 *    - Ejecutar cuando cambie el tema
 * 
 * 4. Crear el JSX del botón
 *    - Icono de sol/luna según el tema
 *    - Texto descriptivo
 * 
 * 5. Crear estilos en ThemeToggle.module.scss (opcional)
 */

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


'use client';

import { useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from './ThemeToggle.module.scss';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
    const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');

    // Aplicar el tema al documento cada vez que cambie
    useEffect(() => {
        document.body.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    // Cambiar el tema
    const toggleTheme = () => {
        const newTheme: Theme = theme === 'light' ? 'dark' : 'light';

        setTheme(newTheme);
    };

    return (
        <button
            type="button"
            className={styles.themeButton}
            onClick={toggleTheme}
            aria-label={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
            aria-pressed={theme === 'dark'}
        >
            {theme === 'light' ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6.5 6.5 0 0 0 8.268 8.268c.344-.215.825-.003.803.401" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.42 1.42" />
                    <path d="m17.65 17.65 1.42 1.42" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.35 17.65-1.42 1.42" />
                    <path d="m19.07 4.93-1.42 1.42" />
                </svg>
            )}

            <span>
                {theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
            </span>
        </button>
    );
}

/* PREGUNTAS PARA REFLEXIONAR:

1. ¿Por qué necesitamos dos useEffect diferentes?

   Respuesta: El custom hook useLocalStorage utiliza su propio useEffect
   para guardar los cambios en localStorage. El useEffect de ThemeToggle
   aplica la clase dark al body cuando cambia el tema.

2. ¿Qué pasa si no usamos useEffect para aplicar el tema?

   Respuesta: El estado de React cambiaría, pero no sincronizaríamos
   la clase dark del documento con ese estado.

3. ¿Por qué guardar en localStorage?

   Respuesta: Para recordar la preferencia del usuario entre sesiones.
   Así el tema no se reinicia al recargar la página.

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

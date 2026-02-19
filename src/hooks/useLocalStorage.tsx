'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook useLocalStorage
 * Funciona como useState pero persiste el valor en localStorage
 */
export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((prevValue: T) => T)) => void] {

    // Lazy initialization (solo se ejecuta una vez)
    const [storedValue, setStoredValue] = useState<T>(() => {

        // Evitar error en SSR
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {

            const item = window.localStorage.getItem(key);

            return item ? JSON.parse(item) as T : initialValue;

        } catch (error) {

            console.error(`Error reading localStorage key "${key}":`, error);

            return initialValue;
        }
    });


    // Setter que también guarda en localStorage
    const setValue = (value: T | ((prevValue: T) => T)) => {

        try {

            const valueToStore =
                value instanceof Function
                    ? value(storedValue)
                    : value;

            setStoredValue(valueToStore);

            if (typeof window !== 'undefined') {
                window.localStorage.setItem(
                    key,
                    JSON.stringify(valueToStore)
                );
            }

        } catch (error) {

            console.error(`Error setting localStorage key "${key}":`, error);

        }
    };


    // Sincronizar entre pestañas (BONUS profesional)
    useEffect(() => {

        const handleStorageChange = (event: StorageEvent) => {

            if (event.key === key && event.newValue !== null) {

                setStoredValue(JSON.parse(event.newValue));

            }

        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };

    }, [key]);


    return [storedValue, setValue];
}

/* 
 * EJERCICIO: Crear custom hook useLocalStorage
 * 
 * CONCEPTOS A APRENDER:
 * - Custom Hooks: Reutilizar lógica de hooks
 * - useState y useEffect combinados
 * - localStorage API
 * - Generics en TypeScript
 * 
 * OBJETIVO:
 * Crear un hook que funcione como useState pero que persista
 * el valor en localStorage automáticamente.
 * 
 * PASOS A SEGUIR:
 * 
 * 1. Crear la función useLocalStorage con generics
 *    - Parámetros: key (string), initialValue (T)
 *    - Retorno: [value, setValue] como useState
 * 
 * 2. Implementar useState para el valor
 *    - Valor inicial: leer de localStorage o usar initialValue
 *    - Manejar errores de parsing JSON
 * 
 * 3. Implementar useEffect para guardar en localStorage
 *    - Ejecutar cuando cambie el valor
 *    - Convertir a JSON antes de guardar
 * 
 * 4. Retornar el valor y la función setter
 */

/* EJEMPLO DE USO:
 * 
 * function MyComponent() {
 *   const [name, setName] = useLocalStorage('userName', 'Guest');
 *   
 *   return (
 *     <div>
 *       <input 
 *         value={name} 
 *         onChange={(e) => setName(e.target.value)} 
 *       />
 *       <p>Hola, {name}!</p>
 *     </div>
 *   );
 * }
 * 
 * El valor de 'name' se guardará automáticamente en localStorage
 * y se recuperará al recargar la página.
 */

/* PREGUNTAS PARA REFLEXIONAR:
 * 
 * 1. ¿Por qué usar una función en useState(() => {...})?
 *    Respuesta: Para lazy initialization. La función solo se ejecuta una vez
 *    al montar el componente, evitando leer localStorage en cada render.
 * 
 * 2. ¿Qué pasa si localStorage no está disponible (SSR)?
 *    Respuesta: Causará un error. En Next.js, debes verificar si estás en el
 *    cliente (typeof window !== 'undefined') antes de usar localStorage.
 * 
 * 3. ¿Por qué usar generics <T>?
 *    Respuesta: Para que el hook sea type-safe y funcione con cualquier tipo
 *    de dato, manteniendo la inferencia de tipos de TypeScript.
 */

/* BONUS: Mejoras opcionales
 * 1. Agregar soporte para SSR (verificar typeof window)
 * 2. Sincronizar entre pestañas usando storage event
 * 3. Agregar opción para remover el item de localStorage
 * 4. Manejar valores undefined/null de manera especial
 */

/* DÓNDE USAR ESTE HOOK:
 * - ThemeToggle: Guardar preferencia de tema
 * - CommentSection: Persistir comentarios
 * - Cualquier preferencia del usuario
 * - Carrito de compras
 * - Formularios (guardar borrador)
 */

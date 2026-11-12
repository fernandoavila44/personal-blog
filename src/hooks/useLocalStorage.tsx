'use client';

import { useCallback, useEffect, useState } from 'react';

/*
 * Custom hook useLocalStorage
 *
 * Funciona como useState, pero persiste el valor en localStorage.
 *
 * Compatible con SSR (Next.js): en el servidor no existe `window`, así que el
 * primer render siempre usa `initialValue` (igual en servidor y cliente, sin
 * errores de hidratación). Después de montar, un useEffect lee el valor
 * guardado y actualiza el estado.
 *
 * Bonus implementados:
 * - Soporte SSR (typeof window)
 * - Acepta valor o función updater, como setState
 * - Sincronización entre pestañas con el evento `storage`
 * - Función para remover el item
 */

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, SetValue<T>, () => void] {
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    // Cargar el valor guardado una vez montado en el cliente
    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            const item = window.localStorage.getItem(key);
            if (item !== null) {
                setStoredValue(JSON.parse(item) as T);
            }
        } catch (error) {
            console.error(`Error leyendo localStorage["${key}"]:`, error);
        }
    }, [key]);

    // Sincronizar entre pestañas
    useEffect(() => {
        const handleStorage = (event: StorageEvent) => {
            if (event.key !== key) return;
            try {
                setStoredValue(event.newValue !== null ? (JSON.parse(event.newValue) as T) : initialValue);
            } catch (error) {
                console.error(error);
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
        // initialValue se omite a propósito para no re-suscribir en cada render
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    const setValue: SetValue<T> = useCallback(
        (value) => {
            setStoredValue((prev) => {
                const valueToStore = value instanceof Function ? value(prev) : value;
                try {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore));
                } catch (error) {
                    console.error(`Error guardando localStorage["${key}"]:`, error);
                }
                return valueToStore;
            });
        },
        [key]
    );

    const removeValue = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.error(error);
        }
        setStoredValue(initialValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    return [storedValue, setValue, removeValue];
}

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

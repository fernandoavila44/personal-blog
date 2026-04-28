import { useState, useEffect } from 'react';

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
 */

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    // 1 y 2: Implementamos useState con inicialización lazy para no leer localStorage en cada render
    const [storedValue, setStoredValue] = useState<T>(() => {
        // BONUS: Verificación de SSR (Server-Side Rendering)
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            // Si existe en localStorage lo parseamos, sino devolvemos el valor inicial
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error al leer de localStorage:", error);
            return initialValue;
        }
    });

    // 3: Función setter que actualiza el estado local y también localStorage
    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
        }
    };

    // BONUS: Sincronizar entre pestañas usando el evento 'storage'
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key && e.newValue) {
                try {
                    setStoredValue(JSON.parse(e.newValue));
                } catch (error) {
                    console.error("Error al parsear desde otra pestaña:", error);
                }
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('storage', handleStorageChange);
            return () => window.removeEventListener('storage', handleStorageChange);
        }
    }, [key]);

    // 4: Retornamos el valor y su setter, idéntico a cómo funciona useState
    return [storedValue, setValue];
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

/* BONUS: Mejoras opcionales (¡IMPLEMENTADAS!)
 * 1. Agregar soporte para SSR (verificar typeof window) -> ¡HECHO!
 * 2. Sincronizar entre pestañas usando storage event -> ¡HECHO!
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

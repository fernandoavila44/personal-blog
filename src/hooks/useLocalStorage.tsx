'use client';

import { useState, useEffect } from 'react';

/**
 * Hook personalizado para usar localStorage con soporte SSR y sincronización
 * 
 * @param key La clave bajo la cual se guardará en localStorage
 * @param initialValue El valor inicial por defecto
 * @returns Un arreglo con el valor actual y una función para actualizarlo (igual que useState)
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
    // 1. Estado para almacenar nuestro valor
    // Usamos una función de inicialización "lazy" para que solo evalúe localStorage una vez
    const [storedValue, setStoredValue] = useState<T>(() => {
        // Prevenir errores de SSR (Server-Side Rendering) en Next.js
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            // Intentar leer de localStorage
            const item = window.localStorage.getItem(key);
            // Parsear el JSON o devolver initialValue si está vacío
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // Si hay error al parsear el JSON (ej. si fue modificado manualmente), devolver inicial
            console.error(`Error leyendo localStorage [${key}]:`, error);
            return initialValue;
        }
    });

    // 2. Retornar una versión de la función setter que persista en localStorage
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            // Permitir valor directo o función callback (como useState normal)
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            
            // Actualizar estado de React
            setStoredValue(valueToStore);
            
            // Guardar en localStorage si estamos en el cliente
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
                
                // Disparar un evento custom para sincronizar componentes dentro de la MISMA pestaña
                window.dispatchEvent(new Event('local-storage'));
            }
        } catch (error) {
            console.error(`Error guardando localStorage [${key}]:`, error);
        }
    };

    // 3. Efecto para sincronizar entre pestañas usando el evento 'storage' nativo
    useEffect(() => {
        const handleStorageChange = (e?: StorageEvent | Event) => {
            // Si es un evento StorageEvent de otra pestaña y no es de nuestra key, ignorar
            if (e && 'key' in e && e.key !== key) return;

            try {
                const item = window.localStorage.getItem(key);
                setStoredValue(item ? JSON.parse(item) : initialValue);
            } catch (error) {
                console.error(error);
            }
        };

        // Escuchar cambios de OTRAS pestañas
        window.addEventListener('storage', handleStorageChange);
        
        // Escuchar cambios forzados por nuestro `setValue` en la MISMA pestaña
        window.addEventListener('local-storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('local-storage', handleStorageChange);
        };
    }, [key, initialValue]);

    return [storedValue, setValue];
}

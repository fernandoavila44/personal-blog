'use client';

import { useState, useEffect } from 'react';

/**
 * Custom Hook: useLocalStorage
 * Funciona como useState pero persiste el valor en localStorage
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            // Verificar si estamos en el cliente (SSR safe)
            if (typeof window === 'undefined') {
                return initialValue;
            }

            // Obtener el valor de localStorage
            const item = window.localStorage.getItem(key);
            
            // Si existe, parsearlo; si no, usar el valor inicial
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    /**
     * Función setter que también actualiza localStorage
     */
    const setValue = (value: T) => {
        try {
            // Actualizar el estado de React
            setStoredValue(value);

            // Verificar si estamos en el cliente
            if (typeof window !== 'undefined') {
                // Guardar en localStorage
                window.localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    // Retornar el valor y la función setter (similar a useState)
    return [storedValue, setValue];
}

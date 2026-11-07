'use client';

import { useState, useEffect } from 'react';

/*
 * Custom hook useLocalStorage
 * Funciona como useState, pero persiste el valor en localStorage.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    // Empezamos con initialValue: así el servidor y el navegador renderizan lo mismo
    // (en el servidor no existe window ni localStorage)
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    // Al montar el componente (solo en el navegador), leemos el valor guardado
    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item !== null) {
                setStoredValue(JSON.parse(item));
            }
        } catch (error) {
            console.error(error);
        }
    }, [key]);

    // Igual que setState, pero además guarda el valor en localStorage
    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
}
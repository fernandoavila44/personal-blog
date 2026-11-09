'use client';

import { useEffect, useState } from 'react';

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T) => void] {
    // El servidor y el primer render del navegador usan el mismo valor.
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    const [isInitialized, setIsInitialized] = useState(false);

    // Después de montar el componente, leemos localStorage.
    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);

            if (item !== null) {
                setStoredValue(JSON.parse(item));
            }
        } catch (error) {
            console.error('Error al leer localStorage:', error);
        } finally {
            setIsInitialized(true);
        }
    }, [key]);

    // Solo guardamos cuando ya terminamos de leer el valor inicial.
    useEffect(() => {
        if (!isInitialized) return;

        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    }, [key, storedValue, isInitialized]);

    return [storedValue, setStoredValue];
}


'use client';

import { useEffect, useState } from 'react';

export default function useLocalStorage<T>(
    key: string,
    initialValue: T
) {
    const [value, setValue] = useState<T>(initialValue);
    const [isReady, setIsReady] = useState(false);

    // Recuperar el valor guardado en el navegador
    useEffect(() => {
        try {
            const storedValue = localStorage.getItem(key);

            if (storedValue !== null) {
                setValue(JSON.parse(storedValue) as T);
            }
        } catch (error) {
            console.error('Error al recuperar datos:', error);
        } finally {
            setIsReady(true);
        }
    }, [key]);

    // Guardar los cambios cuando el estado esté inicializado
    useEffect(() => {
        if (!isReady) return;

        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error al guardar datos:', error);
        }
    }, [key, value, isReady]);

    return [value, setValue, isReady] as const;
}

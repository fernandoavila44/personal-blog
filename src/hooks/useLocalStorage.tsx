'use client';

import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(initialValue);

    // 1) Cargar valor desde localStorage al montar
    useEffect(() => {
        try {
            const item = localStorage.getItem(key);
            if (item !== null) {
                setValue(JSON.parse(item) as T);
            }
        } catch (error) {
            console.error('Error leyendo localStorage:', error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    // 2) Guardar en localStorage cada vez que cambie value
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error guardando localStorage:', error);
        }
    }, [key, value]);

    return [value, setValue] as const;
}

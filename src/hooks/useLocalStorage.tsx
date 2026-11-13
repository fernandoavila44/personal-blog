// import { useState, useEffect } from 'react';

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

'use client';

import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [fallback] = useState<T>(() => initialValue);
  const [value, setValue] = useState<T>(fallback);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  // Recuperar los datos guardados al abrir el componente.
  useEffect(() => {
    let savedValue = fallback;

    try {
      const saved = window.localStorage.getItem(key);

      if (saved !== null) {
        savedValue = JSON.parse(saved) as T;
      }
    } catch (error) {
      console.error('No se pudieron leer los datos guardados:', error);
    }

    // Sincronización inicial con el almacenamiento del navegador.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(savedValue);
    setLoadedKey(key);
  }, [key, fallback]);

  // Guardar solo después de recuperar los datos anteriores.
  useEffect(() => {
    if (loadedKey !== key) {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('No se pudieron guardar los datos:', error);
    }
  }, [key, value, loadedKey]);

  return [value, setValue];
}
'use client';

import { useState } from 'react';

interface Comment {
    id: number;
    author: string;
    text: string;
    date: string;
}

export default function CommentSection() {

    // Estado para comentarios
    const [comments, setComments] = useState<Comment[]>([]);

    // Estado para el formulario
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    // Estado opcional para error
    const [error, setError] = useState('');

    // Función para agregar comentario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validación
        if (!author.trim() || !text.trim()) {
            setError('Por favor completa todos los campos');
            return;
        }

        if (text.trim().length < 3) {
            setError('El comentario debe tener al menos 3 caracteres');
            return;
        }

        // Crear nuevo comentario
        const newComment: Comment = {
            id: Date.now(), // ID único
            author: author.trim(),
            text: text.trim(),
            date: new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };

        // Agregar comentario al inicio
        setComments(prev => [newComment, ...prev]);

        // Limpiar formulario
        setAuthor('');
        setText('');
        setError('');
    };

    return (
        <div style={{ marginTop: '3rem' }}>

            <h3 style={{ marginBottom: '1rem' }}>
                Comentarios ({comments.length})
            </h3>

            {/* Formulario */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>

                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Tu nombre"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '6px',
                            border: '1px solid #ccc'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <textarea
                        placeholder="Tu comentario"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={4}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '6px',
                            border: '1px solid #ccc'
                        }}
                    />
                </div>

                {error && (
                    <div style={{
                        color: 'red',
                        marginBottom: '1rem',
                        fontSize: '0.9rem'
                    }}>
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    style={{
                        padding: '0.6rem 1.2rem',
                        backgroundColor: '#0070f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    Agregar comentario
                </button>

            </form>

            {/* Lista de comentarios */}
            <div>

                {comments.length === 0 ? (
                    <p style={{ color: '#666' }}>
                        No hay comentarios aún. ¡Sé el primero en comentar!
                    </p>
                ) : (
                    comments.map(comment => (
                        <div
                            key={comment.id}
                            style={{
                                padding: '1rem',
                                marginBottom: '1rem',
                                border: '1px solid #eee',
                                borderRadius: '8px',
                                backgroundColor: '#fafafa'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '0.5rem'
                            }}>
                                <strong>{comment.author}</strong>
                                <small style={{ color: '#666' }}>
                                    {comment.date}
                                </small>
                            </div>

                            <p style={{ margin: 0 }}>
                                {comment.text}
                            </p>
                        </div>
                    ))
                )}

            </div>

        </div>
    );
}

/* 
 * EJERCICIO: Implementar sección de comentarios con React Hooks
 * 
 * CONCEPTOS A APRENDER:
 * - 'use client': Directiva para Client Components
 * - useState: Hook para manejar estado local
 * - Manejo de formularios en React
 * - Renderizado condicional
 * 
 * PASOS A SEGUIR:
 * 
 * 1. Crear el estado para los comentarios
 *    - Usar useState con un array de comentarios
 *    - Cada comentario debe tener: id, author, text, date
 * 
 * 2. Crear el estado para el formulario
 *    - Estado para el nombre del autor
 *    - Estado para el texto del comentario
 * 
 * 3. Implementar función para agregar comentario
 *    - Validar que los campos no estén vacíos
 *    - Crear nuevo comentario con ID único
 *    - Agregar al array de comentarios
 *    - Limpiar el formulario
 * 
 * 4. Crear el JSX:
 *    - Formulario para agregar comentario
 *    - Lista de comentarios existentes
 *    - Mensaje si no hay comentarios
 * 
 * 5. Crear estilos en CommentSection.module.scss
 */

/* PREGUNTAS PARA REFLEXIONAR:
 * 
 * 1. ¿Por qué necesitamos 'use client' en este archivo?
 *    Respuesta: Porque estamos usando useState, que es un hook de React
 *    que solo funciona en Client Components.
 * 
 * 2. ¿Qué pasa con los comentarios si refrescas la página?
 *    Respuesta: Se pierden, porque solo están en el estado local.
 *    Para persistirlos, necesitarías localStorage o una base de datos.
 * 
 * 3. ¿Cómo generas IDs únicos para los comentarios?
 *    Respuesta: Puedes usar Date.now(), o comments.length + 1, o una librería
 *    como uuid. Para este ejercicio, cualquier método simple funciona.
 */

/* BONUS: Persistir comentarios en localStorage
 * - Usar useEffect para cargar comentarios al montar
 * - Guardar en localStorage cada vez que cambian los comentarios
 * - Investigar el hook useLocalStorage (otro ejercicio)
 */

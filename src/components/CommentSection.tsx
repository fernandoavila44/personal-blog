'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from './CommentSection.module.scss';

/*
 * Sección de comentarios (Client Component).
 *
 * - useState maneja los campos del formulario (autor y texto).
 * - Los comentarios se guardan con el hook useLocalStorage (BONUS), usando una
 *   clave distinta por post, así cada post tiene sus propios comentarios y no
 *   se pierden al recargar la página.
 */

interface Comment {
    id: number;
    author: string;
    text: string;
    date: string;
}

interface CommentSectionProps {
    postSlug: string;
}

export default function CommentSection({ postSlug }: CommentSectionProps) {
    // Estado de los comentarios (persistido en localStorage)
    const [comments, setComments] = useLocalStorage<Comment[]>(`comments-${postSlug}`, []);

    // Estado del formulario
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validar campos
        if (!author.trim() || !text.trim()) {
            setError('Por favor completa tu nombre y tu comentario.');
            return;
        }

        // Crear nuevo comentario
        const newComment: Comment = {
            id: Date.now(),
            author: author.trim(),
            text: text.trim(),
            date: new Date().toISOString(),
        };

        // Agregar a la lista
        setComments([...comments, newComment]);

        // Limpiar formulario
        setAuthor('');
        setText('');
        setError('');
    };

    const formatDate = (isoDate: string) =>
        new Date(isoDate).toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

    return (
        <section className={styles.commentSection}>
            <h3 className={styles.title}>
                Comentarios <span className={styles.count}>({comments.length})</span>
            </h3>

            {/* Formulario */}
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Tu nombre"
                    aria-label="Tu nombre"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <textarea
                    className={styles.textarea}
                    placeholder="Tu comentario"
                    aria-label="Tu comentario"
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className="btn btn-primary">
                    Agregar comentario
                </button>
            </form>

            {/* Lista de comentarios */}
            <div className={styles.list}>
                {comments.length === 0 ? (
                    <p className={styles.empty}>No hay comentarios aún. ¡Sé el primero en comentar!</p>
                ) : (
                    comments.map((comment) => (
                        <article key={comment.id} className={styles.comment}>
                            <div className={styles.commentHeader}>
                                <span className={styles.avatar} aria-hidden="true">
                                    {comment.author[0].toUpperCase()}
                                </span>
                                <div>
                                    <strong className={styles.author}>{comment.author}</strong>
                                    <time className={styles.date} dateTime={comment.date}>
                                        {formatDate(comment.date)}
                                    </time>
                                </div>
                            </div>
                            <p className={styles.text}>{comment.text}</p>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
}

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

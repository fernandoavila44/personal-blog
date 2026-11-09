'use client';

import { useState, type FormEvent } from 'react';
import styles from './CommentSection.module.scss';

interface Comment {
    id: number;
    author: string;
    text: string;
    date: string;
}

export default function CommentSection() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Evitar comentarios con campos vacíos
        if (!author.trim() || !text.trim()) {
            return;
        }

        const newComment: Comment = {
            id: Date.now(),
            author: author.trim(),
            text: text.trim(),
            date: new Date().toLocaleString('es-CO', {
                dateStyle: 'medium',
                timeStyle: 'short'
            })
        };

        // Agregar el nuevo comentario sin modificar el array anterior
        setComments((previousComments) => [
            ...previousComments,
            newComment
        ]);

        // Limpiar el formulario
        setAuthor('');
        setText('');
    };

    return (
        <section className={styles.commentSection}>
            <h3 className={styles.title}>Comentarios ({comments.length})</h3>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="comment-author">Tu nombre</label>
                    <input
                        id="comment-author"
                        type="text"
                        placeholder="Escribe tu nombre"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        minLength={2}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="comment-text">Tu comentario</label>
                    <textarea
                        id="comment-text"
                        placeholder="¿Qué opinas de esta publicación?"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={4}
                        required
                        minLength={1}
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Agregar comentario
                </button>
            </form>

            <div className={styles.commentsList}>
                {comments.length === 0 ? (
                    <p className={styles.emptyMessage}>
                        No hay comentarios aún. ¡Sé el primero en comentar!
                    </p>
                ) : (
                    comments.map((comment) => (
                        <article key={comment.id} className={styles.comment}>
                            <div className={styles.commentHeader}>
                                <strong>{comment.author}</strong>
                                <time>{comment.date}</time>
                            </div>

                            <p>{comment.text}</p>
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


'use client';

import { useEffect, useState } from 'react';
import styles from './Comments.module.scss';

interface Comment {
    id: string;
    name: string;
    message: string;
    date: string;
}

interface CommentsProps {
    slug: string;
}

export default function Comments({ slug }: CommentsProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loadedFor, setLoadedFor] = useState<string | null>(null);

    const storageKey = `santidev-comments-${slug}`;

    // Cargar comentarios de la publicación
    useEffect(() => {
        let active = true;

        let savedComments: Comment[] = [];

        try {
            const storedValue = localStorage.getItem(storageKey);

            if (storedValue !== null) {
                const parsedValue: unknown = JSON.parse(storedValue);

                if (Array.isArray(parsedValue)) {
                    savedComments = parsedValue as Comment[];
                }
            }
        } catch (error) {
            console.error('Error al recuperar comentarios:', error);
        }

        queueMicrotask(() => {
            if (!active) return;

            setComments(savedComments);
            setLoadedFor(slug);
        });

        return () => {
            active = false;
        };
    }, [slug, storageKey]);

    // Guardar comentarios cuando cambien
    useEffect(() => {
        if (loadedFor !== slug) return;

        try {
            localStorage.setItem(storageKey, JSON.stringify(comments));
        } catch (error) {
            console.error('Error al guardar comentarios:', error);
        }
    }, [comments, loadedFor, slug, storageKey]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name.trim().length < 2) {
            setError('El nombre debe tener al menos 2 caracteres.');
            return;
        }

        if (message.trim().length < 5) {
            setError('El comentario debe tener al menos 5 caracteres.');
            return;
        }

        const newComment: Comment = {
            id: `${Date.now()}-${Math.random()}`,
            name: name.trim(),
            message: message.trim(),
            date: new Date().toISOString(),
        };

        setComments((previousComments) => [
            newComment,
            ...previousComments,
        ]);

        setName('');
        setMessage('');
        setError('');
    };

    return (
        <section className={styles.comments}>
            <div className={styles.heading}>
                <span className={styles.eyebrow}>
                    COMUNIDAD SANTIDEV
                </span>

                <h2>Comentarios</h2>

                <p>
                    Comparte tu opinión o cuéntame qué te pareció
                    esta publicación.
                </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="comment-name">
                        Tu nombre
                    </label>

                    <input
                        id="comment-name"
                        type="text"
                        placeholder="Escribe tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={50}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="comment-message">
                        Tu comentario
                    </label>

                    <textarea
                        id="comment-message"
                        placeholder="Escribe lo que piensas sobre este artículo..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        maxLength={1000}
                    />
                </div>

                {error && (
                    <p className={styles.error} role="alert">
                        {error}
                    </p>
                )}

                <button type="submit" className={styles.submitButton}>
                    Publicar comentario →
                </button>
            </form>

            <div className={styles.commentList}>
                <h3>
                    {comments.length === 1
                        ? '1 comentario'
                        : `${comments.length} comentarios`}
                </h3>

                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <article
                            key={comment.id}
                            className={styles.comment}
                        >
                            <div className={styles.avatar}>
                                {comment.name.charAt(0).toUpperCase()}
                            </div>

                            <div className={styles.commentContent}>
                                <div className={styles.commentHeader}>
                                    <strong>{comment.name}</strong>

                                    <time dateTime={comment.date}>
                                        {new Date(comment.date).toLocaleDateString(
                                            'es-CO',
                                            {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            }
                                        )}
                                    </time>
                                </div>

                                <p>{comment.message}</p>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className={styles.emptyComments}>
                        <span>💬</span>
                        <p>
                            Todavía no hay comentarios. ¡Sé el primero
                            en participar!
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

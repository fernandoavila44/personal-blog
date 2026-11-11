
'use client';

import { useState } from 'react';
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
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (author.trim().length < 2) {
            setError('El nombre debe tener al menos 2 caracteres.');
            return;
        }

        if (text.trim().length < 5) {
            setError('El comentario debe tener al menos 5 caracteres.');
            return;
        }

        const newComment: Comment = {
            id: Date.now(),
            author: author.trim(),
            text: text.trim(),
            date: new Date().toLocaleDateString('es-CO', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }),
        };

        setComments((previousComments) => [
            newComment,
            ...previousComments,
        ]);

        setAuthor('');
        setText('');
        setError('');
    };

    return (
        <section className={styles.comments}>
            <h3>Comentarios</h3>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="author">Tu nombre</label>

                    <input
                        id="author"
                        type="text"
                        placeholder="Escribe tu nombre"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        maxLength={50}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="comment">Tu comentario</label>

                    <textarea
                        id="comment"
                        placeholder="Escribe tu comentario..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
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
                    Agregar comentario
                </button>
            </form>

            <div className={styles.commentList}>
                {comments.length === 0 ? (
                    <p className={styles.empty}>
                        No hay comentarios aún. ¡Sé el primero en comentar!
                    </p>
                ) : (
                    comments.map((comment) => (
                        <article
                            key={comment.id}
                            className={styles.comment}
                        >
                            <strong>{comment.author}</strong>
                            <p>{comment.text}</p>
                            <time>{comment.date}</time>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
}

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
    const [author, setAuthor] = useState<string>('');
    const [text, setText] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!author.trim() || !text.trim()) {
            return;
        }

        const newComment: Comment = {
            id: Date.now(),
            author: author.trim(),
            text: text.trim(),
            date: new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
        };

        setComments([newComment, ...comments]);
        setAuthor('');
        setText('');
    };

    return (
        <div className={styles.commentSection}>
            <h3 className={styles.title}>Comentarios</h3>

            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    placeholder="Tu nombre"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className={styles.input}
                />

                <textarea
                    placeholder="Tu comentario"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                    className={styles.textarea}
                />

                <button type="submit" className={styles.button}>
                    Agregar comentario
                </button>
            </form>

            <div className={styles.commentsList}>
                {comments.length === 0 ? (
                    <p className={styles.empty}>
                        No hay comentarios aún. ¡Sé el primero en comentar!
                    </p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className={styles.comment}>
                            <div className={styles.commentHeader}>
                                <strong>{comment.author}</strong>
                                <small>{comment.date}</small>
                            </div>
                            <p>{comment.text}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!author.trim() || !text.trim()) return;

        const newComment: Comment = {
            id: Date.now(),
            author: author.trim(),
            text: text.trim(),
            date: new Date().toISOString(),
        };

        setComments([...comments, newComment]);
        setAuthor('');
        setText('');
    };

    return (
        <div className={styles.commentSection}>
            <h3>Comentarios ({comments.length})</h3>

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
                    rows={3}
                    className={styles.textarea}
                />
                <button type="submit" className="btn btn-primary">
                    Agregar comentario
                </button>
            </form>

            <div className={styles.list}>
                {comments.length === 0 ? (
                    <p className={styles.empty}>No hay comentarios aún. ¡Sé el primero en comentar!</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className={styles.comment}>
                            <div className={styles.commentHeader}>
                                <strong>{comment.author}</strong>
                                <time>
                                    {new Date(comment.date).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </time>
                            </div>
                            <p>{comment.text}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

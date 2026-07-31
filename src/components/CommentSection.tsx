'use client';

import { FormEvent, useState } from 'react';
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

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!author.trim() || !text.trim()) {
            setError('Escribe tu nombre y un comentario.');
            return;
        }

        const newComment: Comment = {
            id: Date.now(),
            author: author.trim(),
            text: text.trim(),
            date: new Date().toLocaleDateString('es-CO'),
        };

        setComments([...comments, newComment]);
        setAuthor('');
        setText('');
        setError('');
    };

    return (
        <section className={styles.comments}>
            <h2>Comentarios</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Tu nombre" />
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Escribe tu comentario" rows={4} />
                {error && <p className={styles.error}>{error}</p>}
                <button className="btn btn-primary" type="submit">Publicar comentario</button>
            </form>

            <div className={styles.list}>
                {comments.length === 0 ? <p>No hay comentarios aún. ¡Sé el primero en comentar!</p> : comments.map((comment) => (
                    <article key={comment.id} className={styles.comment}>
                        <strong>{comment.author}</strong>
                        <p>{comment.text}</p>
                        <small>{comment.date}</small>
                    </article>
                ))}
            </div>
        </section>
    );
}

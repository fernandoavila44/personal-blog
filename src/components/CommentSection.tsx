'use client';

import { useState, useEffect } from 'react';
import styles from './CommentSection.module.scss';

interface Comment {
    id: number;
    author: string;
    text: string;
    date: string;
}

export default function CommentSection({ postSlug }: { postSlug?: string }) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    // BONUS: Cargar comentarios de localStorage al montar
    useEffect(() => {
        const storageKey = postSlug ? `comments-${postSlug}` : 'comments';
        const savedComments = localStorage.getItem(storageKey);
        if (savedComments) {
            try {
                setComments(JSON.parse(savedComments));
            } catch (e) {
                console.error("Error al cargar comentarios", e);
            }
        }
    }, [postSlug]);

    // BONUS: Guardar comentarios en localStorage cuando cambian
    useEffect(() => {
        const storageKey = postSlug ? `comments-${postSlug}` : 'comments';
        if (comments.length > 0) {
            localStorage.setItem(storageKey, JSON.stringify(comments));
        }
    }, [comments, postSlug]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validar campos
        if (!author.trim() || !text.trim()) {
            setError('Por favor completa tu nombre y el comentario.');
            return;
        }

        setError('');

        // Crear nuevo comentario
        const newComment: Comment = {
            id: Date.now(),
            author: author.trim(),
            text: text.trim(),
            date: new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        // Agregar a la lista al principio
        setComments((prevComments) => [newComment, ...prevComments]);

        // Limpiar formulario
        setAuthor('');
        setText('');
    };

    return (
        <section className={styles.commentSection}>
            <h3 className={styles.title}>Comentarios ({comments.length})</h3>

            <form onSubmit={handleSubmit} className={styles.form}>
                {error && <div className={styles.error}>{error}</div>}
                
                <div className={styles.inputGroup}>
                    <input 
                        type="text" 
                        placeholder="Tu nombre"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className={styles.input}
                    />
                </div>
                
                <div className={styles.inputGroup}>
                    <textarea 
                        placeholder="Escribe tu comentario aquí..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className={styles.textarea}
                        rows={4}
                    />
                </div>
                
                <button type="submit" className={styles.submitButton}>
                    Agregar comentario
                </button>
            </form>

            <div className={styles.commentList}>
                {comments.length === 0 ? (
                    <p className={styles.emptyMessage}>
                        No hay comentarios aún. ¡Sé el primero en comentar!
                    </p>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className={styles.comment}>
                            <div className={styles.commentHeader}>
                                <strong>{comment.author}</strong>
                                <small>{comment.date}</small>
                            </div>
                            <p className={styles.commentText}>{comment.text}</p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

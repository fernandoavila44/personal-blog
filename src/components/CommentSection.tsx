'use client';

import { useState, useEffect } from 'react';
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
    const [isLoaded, setIsLoaded] = useState(false);

    // BONUS: Cargar comentarios del localStorage al iniciar
    useEffect(() => {
        const savedComments = localStorage.getItem('blog_comments');
        if (savedComments) {
            try {
                setComments(JSON.parse(savedComments));
            } catch (e) {
                console.error("Error al cargar comentarios", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // BONUS: Guardar en localStorage cada vez que la lista cambia
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('blog_comments', JSON.stringify(comments));
        }
    }, [comments, isLoaded]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validar que los campos no estén vacíos
        if (!author.trim() || !text.trim()) {
            alert('Por favor, completa tanto el nombre como el comentario.');
            return;
        }

        // Crear nuevo comentario
        const newComment: Comment = {
            id: Date.now(), // ID único simple
            author: author.trim(),
            text: text.trim(),
            date: new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        // Agregar al principio del array de comentarios
        setComments((prev) => [newComment, ...prev]);

        // Limpiar formulario
        setAuthor('');
        setText('');
    };

    // Prevenir errores de hidratación (esperar a que lea de localStorage)
    if (!isLoaded) return null;

    return (
        <div className={styles.commentSection}>
            <h3 className={styles.title}>Comentarios ({comments.length})</h3>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className={styles.form}>
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
                        placeholder="Escribe tu comentario..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className={styles.textarea}
                        rows={4}
                    />
                </div>
                
                <button type="submit" className={styles.submitBtn}>
                    Agregar comentario
                </button>
            </form>

            {/* Lista de comentarios */}
            <div className={styles.commentsList}>
                {comments.length === 0 ? (
                    <p className={styles.emptyMsg}>
                        No hay comentarios aún. ¡Sé el primero en comentar!
                    </p>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className={styles.commentCard}>
                            <div className={styles.commentHeader}>
                                <strong>{comment.author}</strong>
                                <small>{comment.date}</small>
                            </div>
                            <p className={styles.commentText}>{comment.text}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

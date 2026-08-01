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

  
  useEffect(() => {
    const saved = localStorage.getItem('comments');
    if (saved) {
      setComments(JSON.parse(saved));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!author.trim() || !text.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      author,
      text,
      date: new Date().toLocaleString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setComments([...comments, newComment]);
    setAuthor('');
    setText('');
  };

  return (
    <div className={styles.commentSection}>
      <h3>Comentarios</h3>

      <div className={styles.commentsList}>
        {comments.length === 0 ? (
          <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <strong>{comment.author}</strong>
              <p>{comment.text}</p>
              <small>{comment.date}</small>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Tu nombre"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          placeholder="Tu comentario"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Agregar comentario</button>
      </form>
    </div>
  );
}

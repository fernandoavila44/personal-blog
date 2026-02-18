'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from './CommentSection.module.scss';

interface Comment {
  id: number;
  name: string;
  message: string;
  date: string;
}

interface CommentSectionProps {
  postSlug: string;
}

export default function CommentSection({ postSlug }: CommentSectionProps) {
  const [comments, setComments] = useLocalStorage<Comment[]>(
    `comments-${postSlug}`,
    []
  );

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !message) return;

    const newComment: Comment = {
      id: Date.now(),
      name,
      message,
      date: new Date().toLocaleString(),
    };

    setComments([...comments, newComment]);
    setName('');
    setMessage('');
  };

  return (
    <section className={styles.comments}>
      <h3>Comentarios</h3>

      {/* 📋 Lista */}
      {comments.length === 0 && (
        <p className={styles.empty}>Aún no hay comentarios.</p>
      )}

      <ul className={styles.list}>
        {comments.map((c) => (
          <li key={c.id} className={styles.comment}>
            <strong>{c.name}</strong>
            <span className={styles.date}>{c.date}</span>
            <p>{c.message}</p>
          </li>
        ))}
      </ul>

      {/* ✍️ Formulario */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Escribe tu comentario..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit">Enviar comentario</button>
      </form>
    </section>
  );
}

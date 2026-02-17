'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

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

    // ✅ Validación
    if (!author.trim() || !text.trim()) return;

    // ✅ Crear comentario
    const newComment: Comment = {
      id: Date.now(),
      author: author.trim(),
      text: text.trim(),
      date: new Date().toISOString(),
    };

    // ✅ Guardar y limpiar
    setComments((prev) => [newComment, ...prev]);
    setAuthor('');
    setText('');
  };

  return (
    <section>
      <h3>Comentarios</h3>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'grid', gap: '0.75rem', maxWidth: 600 }}
      >
        <input
          type="text"
          placeholder="Tu nombre"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <textarea
          placeholder="Tu comentario"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button type="submit">Agregar comentario</button>
      </form>

      <div style={{ marginTop: '1rem', display: 'grid', gap: '0.75rem', maxWidth: 700 }}>
        {comments.length === 0 ? (
          <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              style={{ border: '1px solid #e5e5e5', padding: '1rem', borderRadius: 10 }}
            >
              <strong>{comment.author}</strong>
              <p style={{ margin: '0.5rem 0' }}>{comment.text}</p>
              <small style={{ opacity: 0.7 }}>
                {new Date(comment.date).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

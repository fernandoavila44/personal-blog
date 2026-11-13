"use client";

import { useState } from "react";
import styles from "./CommentSection.module.scss";

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!author.trim() || !text.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      author: author.trim(),
      text: text.trim(),
      date: new Date().toISOString(),
    };

    setComments((currentComments) => [...currentComments, newComment]);
    setAuthor("");
    setText("");
  };

  return (
    <section className={styles.commentSection}>
      <h2>Comentarios</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="commentAuthor">Nombre</label>
          <input
            id="commentAuthor"
            type="text"
            placeholder="Tu nombre"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="commentText">Comentario</label>
          <textarea
            id="commentText"
            placeholder="Escribe tu comentario..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            required
          />
        </div>

        <button type="submit">Agregar comentario</button>
      </form>

      <div className={styles.commentList}>
        {comments.length === 0 ? (
          <p className={styles.emptyMessage}>
            No hay comentarios aún. ¡Sé el primero en comentar!
          </p>
        ) : (
          comments.map((comment) => (
            <article className={styles.comment} key={comment.id}>
              <h3>{comment.author}</h3>
              <p>{comment.text}</p>
              <time dateTime={comment.date}>
                {new Date(comment.date).toLocaleString("es-CO")}
              </time>
            </article>
          ))
        )}
      </div>
    </section>
  );
}



// import { useState } from 'react';
// import styles from './CommentSection.module.scss';

/* 
 * EJERCICIO: Implementar sección de comentarios con React Hooks
 * 
 * CONCEPTOS A APRENDER:
 * - 'use client': Directiva para Client Components
 * - useState: Hook para manejar estado local
 * - Manejo de formularios en React
 * - Renderizado condicional
 * 
 * PASOS A SEGUIR:
 * 
 * 1. Crear el estado para los comentarios
 *    - Usar useState con un array de comentarios
 *    - Cada comentario debe tener: id, author, text, date
 * 
 * 2. Crear el estado para el formulario
 *    - Estado para el nombre del autor
 *    - Estado para el texto del comentario
 * 
 * 3. Implementar función para agregar comentario
 *    - Validar que los campos no estén vacíos
 *    - Crear nuevo comentario con ID único
 *    - Agregar al array de comentarios
 *    - Limpiar el formulario
 * 
 * 4. Crear el JSX:
 *    - Formulario para agregar comentario
 *    - Lista de comentarios existentes
 *    - Mensaje si no hay comentarios
 * 
 * 5. Crear estilos en CommentSection.module.scss
 */

'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import styles from './CommentSection.module.scss';
import { useLocalStorage } from '@/hooks/useLocalStorage';
interface Comment {
  id: string;
  author: string;
  text: string;
  date?: string;
}

type CommentSectionProps = {
  postSlug: string;
};

export default function CommentSection({
  postSlug,
}: CommentSectionProps) {
  const [comments, setComments] = useLocalStorage<Comment[]>(
    `blog-comments-${postSlug}`,
    []
  );
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!author.trim() || !text.trim()) {
      setError('Escribe tu nombre y un comentario.');
      return;
    }

    const newComment: Comment = {
  id: crypto.randomUUID(),
  author: author.trim(),
  text: text.trim(),
  date: new Date().toISOString(),
};
    setComments((previous) => [...previous, newComment]);
    setAuthor('');
    setText('');
    setError('');
  }

  return (
    <section className={styles.comments}>
      <h2>Comentarios</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comment-author">Tu nombre</label>
          <input
            id="comment-author"
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="comment-text">Tu comentario</label>
          <textarea
            id="comment-text"
            rows={4}
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </div>

        {error && (
  <p role="alert" className={styles.error}>
    {error}
  </p>
)}

        <button type="submit" className="btn btn-primary">
          Publicar comentario
        </button>
      </form>

      <div>
        {comments.length === 0 ? (
          <p>Todavía no hay comentarios. ¡Escribe el primero!</p>
        ) : (
          comments.map((comment) => (
            <article key={comment.id}>
              <h3>{comment.author}</h3>
              <p>{comment.text}</p>
              {comment.date && (
  <small>
    <time dateTime={comment.date}>
      {new Date(comment.date).toLocaleString('es-CO')}
    </time>
  </small>
)}
            </article>
          ))
        )}
      </div>
    </section>
  );
}

/* PREGUNTAS PARA REFLEXIONAR:
 * 
 * 1. ¿Por qué necesitamos 'use client' en este archivo?
 *    Respuesta: Porque estamos usando useState, que es un hook de React
 *    que solo funciona en Client Components.
 * 
 * 2. ¿Qué pasa con los comentarios si refrescas la página?
 *    Respuesta: Se pierden, porque solo están en el estado local.
 *    Para persistirlos, necesitarías localStorage o una base de datos.
 * 
 * 3. ¿Cómo generas IDs únicos para los comentarios?
 *    Respuesta: Puedes usar Date.now(), o comments.length + 1, o una librería
 *    como uuid. Para este ejercicio, cualquier método simple funciona.
 */

/* BONUS: Persistir comentarios en localStorage
 * - Usar useEffect para cargar comentarios al montar
 * - Guardar en localStorage cada vez que cambian los comentarios
 * - Investigar el hook useLocalStorage (otro ejercicio)
 */

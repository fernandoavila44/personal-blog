'use client';

import { useState, useEffect} from 'react';
import styles from './CommentSection.module.scss';
import { useLocalStorage } from '@/hooks/useLocalStorage';


interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

export default function CommentSection() {

  //Estado de comentarios
  // const [comments, setComments] = useState<Comment[]>([]);
  const [comments, setComments] = useLocalStorage<Comment[]>(
    'blog-comments',
    []
  );

  //Estado del formulario
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  //Estado de montaje
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  //Función para agregar comentario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!author || !text) return;

    const newComment: Comment = {
      id: Date.now(),
      author,
      text,
      date: new Date().toLocaleString(),
    };

    setComments([...comments, newComment]);
    setAuthor('');
    setText('');
  };

  const handleDelete = (id: number) => {
    const updatedComments = comments.filter(comment => comment.id !== id);
    setComments(updatedComments);
  };

  if (!isMounted) return null;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Comentarios</h3>

      {/* Formulario */}
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
          className={styles.textarea}
        />

        <button type="submit" className={styles.button}>
          Agregar comentario
        </button>
      </form>

      {/* Lista de comentarios */}
      <div className={styles.commentList}>
        {comments.length === 0 ? (
          <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className={styles.commentCard}>

              <div className={styles.commentHeader}>
                <div>
                  <span className={styles.author}>{comment.author}</span>
                  <span className={styles.date}> · {comment.date}</span>
                </div>

                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(comment.id)}
                >
                  ✕
                </button>
              </div>

              <p className={styles.commentText}>{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
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

'use client';

import { useState } from 'react';

interface Comment {
    id: number;
    author: string;
    text: string;
    date: string;
}

export default function CommentSection() {
    // Lista de comentarios
    const [comments, setComments] = useState<Comment[]>([]);

    // Estado del formulario
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    // Agrega un comentario nuevo
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validar que los campos no estén vacíos
        if (!author.trim() || !text.trim()) return;

        // Crear el nuevo comentario con un id único
        const newComment: Comment = {
            id: Date.now(),
            author: author.trim(),
            text: text.trim(),
            date: new Date().toLocaleDateString(),
        };

        // Agregar a la lista y limpiar el formulario
        setComments([...comments, newComment]);
        setAuthor('');
        setText('');
    };

    return (
        <div>
            <h3>Comentarios</h3>

            <form onSubmit={handleSubmit}>
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

            <div>
                {comments.length === 0 ? (
                    <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id}>
                            <strong>{comment.author}</strong>
                            <p>{comment.text}</p>
                            <small>{comment.date}</small>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
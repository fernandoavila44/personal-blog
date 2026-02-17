'use client';

import { useState } from 'react';

interface Comment {
    id: number;
    author: string;
    text: string;
    date: string;
}

export default function CommentSection() {
    const [comments, setComments] = useState<Comment[]>([
        {
            id: 1,
            author: 'Juan García',
            text: 'Excelente artículo, muy bien explicado! Me ayudó a entender los Server Components.',
            date: '2024-02-10'
        },
        {
            id: 2,
            author: 'María López',
            text: 'Gracias por compartir este conocimiento. Voy a implementarlo en mi proyecto.',
            date: '2024-02-11'
        }
    ]);

    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validar campos
        if (!author.trim() || !text.trim()) {
            alert('Por favor, rellena todos los campos');
            return;
        }

        if (text.length < 10) {
            alert('El comentario debe tener al menos 10 caracteres');
            return;
        }

        // Crear nuevo comentario
        const newComment: Comment = {
            id: Math.max(...comments.map(c => c.id), 0) + 1,
            author: author.trim(),
            text: text.trim(),
            date: new Date().toISOString().split('T')[0]
        };

        // Agregar a la lista
        setComments([...comments, newComment]);

        // Limpiar formulario
        setAuthor('');
        setText('');
    };

    return (
        <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h3 style={{ marginTop: 0 }}>Comentarios ({comments.length})</h3>

            {/* Formulario para agregar comentario */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#fff', borderRadius: '6px' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="author" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                        Tu nombre
                    </label>
                    <input
                        id="author"
                        type="text"
                        placeholder="Tu nombre"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontFamily: 'inherit',
                            fontSize: '1rem',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="text" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                        Tu comentario
                    </label>
                    <textarea
                        id="text"
                        placeholder="Tu comentario (mínimo 10 caracteres)"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={4}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontFamily: 'inherit',
                            fontSize: '1rem',
                            boxSizing: 'border-box',
                            resize: 'vertical'
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        transition: 'background-color 0.2s'
                    }}
                >
                    Agregar comentario
                </button>
            </form>

            {/* Lista de comentarios */}
            <div>
                {comments.length === 0 ? (
                    <p style={{ color: '#666', fontStyle: 'italic' }}>
                        No hay comentarios aún. ¡Sé el primero en comentar!
                    </p>
                ) : (
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            style={{
                                marginBottom: '1.5rem',
                                padding: '1rem',
                                backgroundColor: '#fff',
                                borderRadius: '6px',
                                borderLeft: '4px solid #007bff'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <strong style={{ color: '#333' }}>{comment.author}</strong>
                                <small style={{ color: '#999' }}>
                                    {new Date(comment.date).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </small>
                            </div>
                            <p style={{ margin: '0.5rem 0', color: '#555', lineHeight: '1.6' }}>
                                {comment.text}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';
import styles from './page.module.scss';

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Función de validación
    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};

        if (!name || name.length < 2) {
            newErrors.name = 'El nombre debe tener al menos 2 caracteres';
        }

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Por favor ingresa un email válido';
        }

        if (!message || message.length < 10) {
            newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
        }

        return newErrors;
    };

    // Manejador del envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Simular envío exitoso
        setErrors({});
        setIsSubmitted(true);

        // Limpiar formulario después de 3 segundos
        setTimeout(() => {
            setName('');
            setEmail('');
            setMessage('');
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <div style={{ padding: '4rem 1.5rem', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Contacto</h1>
            <p>¿Tienes alguna pregunta o comentario? ¡Escríbeme!</p>

            {isSubmitted ? (
                <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    borderRadius: '8px',
                    border: '1px solid #c3e6cb'
                }}>
                    ✅ ¡Mensaje enviado exitosamente! Te responderé pronto.
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                            Nombre
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '4px',
                                border: errors.name ? '1px solid #dc3545' : '1px solid #ddd',
                                fontFamily: 'inherit',
                                fontSize: '1rem'
                            }}
                            placeholder="Tu nombre"
                        />
                        {errors.name && (
                            <span style={{ color: '#dc3545', fontSize: '0.875rem', display: 'block', marginTop: '0.25rem' }}>
                                {errors.name}
                            </span>
                        )}
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '4px',
                                border: errors.email ? '1px solid #dc3545' : '1px solid #ddd',
                                fontFamily: 'inherit',
                                fontSize: '1rem',
                                boxSizing: 'border-box'
                            }}
                            placeholder="tu@email.com"
                        />
                        {errors.email && (
                            <span style={{ color: '#dc3545', fontSize: '0.875rem', display: 'block', marginTop: '0.25rem' }}>
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                            Mensaje
                        </label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={5}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '4px',
                                border: errors.message ? '1px solid #dc3545' : '1px solid #ddd',
                                fontFamily: 'inherit',
                                fontSize: '1rem',
                                boxSizing: 'border-box',
                                resize: 'vertical'
                            }}
                            placeholder="Tu mensaje aquí..."
                        />
                        {errors.message && (
                            <span style={{ color: '#dc3545', fontSize: '0.875rem', display: 'block', marginTop: '0.25rem' }}>
                                {errors.message}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        Enviar mensaje
                    </button>
                </form>
            )}
        </div>
    );
}

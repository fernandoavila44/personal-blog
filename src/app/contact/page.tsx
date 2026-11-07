'use client';

import { useState } from 'react';

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export default function ContactPage() {
    // Estados de los campos del formulario
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // Errores de validación y mensaje de éxito
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Valida los campos y devuelve un objeto con los errores encontrados
    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};

        if (!name.trim() || name.trim().length < 2) {
            newErrors.name = 'El nombre debe tener al menos 2 caracteres';
        }

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Por favor ingresa un email válido';
        }

        if (!message.trim() || message.trim().length < 10) {
            newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
        }

        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate();

        // Si hay errores, los mostramos y no enviamos
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitted(false);
            return;
        }

        // Simular envío exitoso
        setErrors({});
        setIsSubmitted(true);

        // Limpiar el formulario después de 3 segundos
        setTimeout(() => {
            setName('');
            setEmail('');
            setMessage('');
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '600px' }}>
            <h1>Contacto</h1>
            <p>¿Tienes alguna pregunta o comentario? ¡Escríbeme!</p>

            <form onSubmit={handleSubmit} noValidate style={{ marginTop: '2rem' }}>
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div>
                    <label htmlFor="message">Mensaje</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                    />
                    {errors.message && <span className="error">{errors.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary">
                    Enviar mensaje
                </button>

                {isSubmitted && (
                    <div className="success">
                        ¡Mensaje enviado exitosamente! Te responderé pronto.
                    </div>
                )}
            </form>
        </div>
    );
}
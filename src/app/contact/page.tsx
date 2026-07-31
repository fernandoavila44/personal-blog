'use client';

import { FormEvent, useState } from 'react';
import styles from './page.module.scss';

interface Errors { name?: string; email?: string; message?: string; }

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = (): Errors => {
        const newErrors: Errors = {};
        if (name.trim().length < 2) newErrors.name = 'El nombre debe tener al menos 2 caracteres.';
        if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Ingresa un correo válido.';
        if (message.trim().length < 10) newErrors.message = 'El mensaje debe tener al menos 10 caracteres.';
        return newErrors;
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newErrors = validate();
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        setIsSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className={`container ${styles.contact}`}>
            <h1>Contacto</h1>
            <p>¿Tienes alguna pregunta o comentario? ¡Escríbeme!</p>
            <form onSubmit={handleSubmit} noValidate>
                <label htmlFor="name">Nombre</label>
                <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                {errors.name && <small className={styles.error}>{errors.name}</small>}

                <label htmlFor="email">Correo electrónico</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <small className={styles.error}>{errors.email}</small>}

                <label htmlFor="message">Mensaje</label>
                <textarea id="message" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} />
                {errors.message && <small className={styles.error}>{errors.message}</small>}

                <button className="btn btn-primary" type="submit">Enviar mensaje</button>
            </form>
            {isSubmitted && <p className={styles.success}>¡Mensaje enviado exitosamente! Te responderé pronto.</p>}
        </div>
    );
}

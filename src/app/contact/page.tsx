'use client';

import { useState } from 'react';
import styles from './page.module.scss';

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export default function ContactPage() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};

        if (!name || name.trim().length < 2) {
            newErrors.name = 'El nombre debe tener al menos 2 caracteres';
        }

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Por favor ingresa un email válido';
        }

        if (!message || message.trim().length < 10) {
            newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
        }

        return newErrors;
    };

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

        setTimeout(() => {
            setName('');
            setEmail('');
            setMessage('');
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <section className={styles.contact}>
            <div className="container">
                <h1 className={styles.title}>Contacto</h1>
                <p className={styles.subtitle}>
                    ¿Tienes alguna pregunta o comentario? ¡Escríbeme!
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="name">Nombre</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && (
                            <span className={styles.error}>{errors.name}</span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                            <span className={styles.error}>{errors.email}</span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="message">Mensaje</label>
                        <textarea
                            id="message"
                            rows={5}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        {errors.message && (
                            <span className={styles.error}>{errors.message}</span>
                        )}
                    </div>

                    <button type="submit" className={styles.button}>
                        Enviar mensaje
                    </button>

                    {isSubmitted && (
                        <div className={styles.success}>
                            ¡Mensaje enviado exitosamente! Te responderé pronto.
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}

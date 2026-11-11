
'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import styles from './page.module.scss';

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export default function ContactPage() {
    // Estados del formulario
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Validación de los campos
    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};

        if (name.trim().length < 2) {
            newErrors.name = 'El nombre debe tener al menos 2 caracteres.';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            newErrors.email = 'Por favor, ingresa un correo válido.';
        }

        if (message.trim().length < 10) {
            newErrors.message = 'El mensaje debe tener al menos 10 caracteres.';
        }

        return newErrors;
    };

    // Envío del formulario
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitted(false);
            return;
        }

        setErrors({});
        setIsSubmitted(true);

        // Limpiar el formulario después de mostrar el mensaje
        setTimeout(() => {
            setName('');
            setEmail('');
            setMessage('');
            setIsSubmitted(false);
        }, 4000);
    };

    return (
        <main className={styles.contact}>
            {/* Encabezado */}
            <section className={styles.hero}>
                <span className={styles.eyebrow}>
                    HABLEMOS
                </span>

                <h1>¡Conectemos!</h1>

                <p>
                    ¿Tienes una pregunta, una idea o simplemente quieres
                    conversar sobre tecnología? Me encantará leerte.
                </p>
            </section>

            {/* Formulario */}
            <section className={styles.formSection}>
                <div className={styles.formContainer}>
                    <div className={styles.formHeader}>
                        <h2>Envíame un mensaje</h2>

                        <p>
                            Completa el formulario y deja tu mensaje.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                        {/* Nombre */}
                        <div className={styles.formGroup}>
                            <label htmlFor="name">
                                Nombre completo
                            </label>

                            <input
                                id="name"
                                type="text"
                                placeholder="Escribe tu nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                aria-invalid={Boolean(errors.name)}
                                aria-describedby={errors.name ? 'name-error' : undefined}
                            />

                            {errors.name && (
                                <span id="name-error" className={styles.error}>
                                    {errors.name}
                                </span>
                            )}
                        </div>

                        {/* Correo */}
                        <div className={styles.formGroup}>
                            <label htmlFor="email">
                                Correo electrónico
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="ejemplo@correo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-invalid={Boolean(errors.email)}
                                aria-describedby={errors.email ? 'email-error' : undefined}
                            />

                            {errors.email && (
                                <span id="email-error" className={styles.error}>
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        {/* Mensaje */}
                        <div className={styles.formGroup}>
                            <label htmlFor="message">
                                Tu mensaje
                            </label>

                            <textarea
                                id="message"
                                rows={6}
                                placeholder="Cuéntame en qué puedo ayudarte..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                aria-invalid={Boolean(errors.message)}
                                aria-describedby={errors.message ? 'message-error' : undefined}
                            />

                            {errors.message && (
                                <span id="message-error" className={styles.error}>
                                    {errors.message}
                                </span>
                            )}
                        </div>

                        {/* Botón */}
                        <button
                            type="submit"
                            className={styles.submitButton}
                        >
                            Enviar mensaje →
                        </button>

                        {/* Confirmación */}
                        {isSubmitted && (
                            <div
                                className={styles.success}
                                role="status"
                                aria-live="polite"
                            >
                                ¡Gracias por escribirme! El formulario pasó
                                la validación correctamente.
                            </div>
                        )}
                    </form>

                    <p className={styles.formNote}>
                        Este formulario es una demostración académica.
                        Todavía no envía mensajes a un correo real.
                    </p>
                </div>
            </section>
        </main>
    );
}

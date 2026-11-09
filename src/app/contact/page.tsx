'use client';

import { useState, type FormEvent } from 'react';
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

    // Validar los campos del formulario
    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};

        if (name.trim().length < 2) {
            newErrors.name = 'El nombre debe tener al menos 2 caracteres';
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            newErrors.email = 'Por favor ingresa un email válido';
        }

        if (message.trim().length < 10) {
            newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
        }

        return newErrors;
    };

    // Procesar el envío del formulario
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitted(false);
            return;
        }

        // Simular un envío exitoso
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
        <main className={styles.contactPage}>
            <div className={styles.contactContainer}>
                <header className={styles.header}>
                    <h1>Contacto</h1>
                    <p>
                        ¿Tienes alguna pregunta o comentario? ¡Escríbeme!
                    </p>
                </header>

                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Nombre</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={errors.name ? styles.inputError : ''}
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        {errors.name && (
                            <span id="name-error" className={styles.error}>
                                {errors.name}
                            </span>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.email ? styles.inputError : ''}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                        {errors.email && (
                            <span id="email-error" className={styles.error}>
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="message">Mensaje</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={5}
                            className={errors.message ? styles.inputError : ''}
                            aria-invalid={Boolean(errors.message)}
                            aria-describedby={errors.message ? 'message-error' : undefined}
                        />
                        {errors.message && (
                            <span id="message-error" className={styles.error}>
                                {errors.message}
                            </span>
                        )}
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Enviar mensaje
                    </button>

                    {isSubmitted && (
                        <div className={styles.success} role="status">
                            ¡Mensaje enviado exitosamente! Te responderé pronto.
                        </div>
                    )}
                </form>
            </div>
        </main>
    );
}

/* PREGUNTAS PARA REFLEXIONAR:
 * 
 * 1. ¿Por qué usar inputs controlados (controlled inputs)?
 *    Respuesta: Para que React maneje el estado del formulario, permitiendo
 *    validación en tiempo real y mejor control sobre los datos.
 * 
 * 2. ¿Qué es e.preventDefault() y por qué lo usamos?
 *    Respuesta: Previene el comportamiento por defecto del formulario (recargar
 *    la página), permitiéndonos manejar el submit con JavaScript.
 * 
 * 3. ¿Cómo mejorarías este formulario en producción?
 *    Respuesta: Conectarlo a una API real, agregar loading state, mejor UX
 *    con validación en tiempo real, usar una librería como react-hook-form.
 */

/* BONUS: Mejoras opcionales
 * 1. Validación en tiempo real (onChange)
 * 2. Loading state mientras se envía
 * 3. Conectar a una API real (API Routes de Next.js)
 * 4. Agregar más campos (teléfono, asunto, etc.)
 * 5. Usar una librería de validación como Zod o Yup
 */

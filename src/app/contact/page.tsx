'use client';

import { useState } from 'react';
import styles from './page.module.scss';

/*
 * Formulario de contacto con validación (Client Component).
 *
 * - useState para cada campo, los errores, el envío en curso y el éxito.
 * - validate() revisa las reglas y devuelve un objeto con los errores.
 * - handleSubmit evita la recarga (preventDefault), valida y simula el envío.
 * - BONUS: el error de un campo se limpia mientras el usuario lo corrige,
 *   y el botón muestra un estado de carga mientras "se envía".
 */

type FormErrors = {
    name?: string;
    email?: string;
    message?: string;
};

export default function ContactPage() {
    // Estados del formulario
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSending, setIsSending] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Validación
    const validate = () => {
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

    // Limpia el error de un campo cuando el usuario lo modifica
    const clearError = (field: keyof FormErrors) => {
        if (errors[field]) {
            setErrors({ ...errors, [field]: undefined });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Simular envío
        setErrors({});
        setIsSending(true);

        setTimeout(() => {
            setIsSending(false);
            setIsSubmitted(true);

            // Limpiar formulario después de 3 segundos
            setTimeout(() => {
                setName('');
                setEmail('');
                setMessage('');
                setIsSubmitted(false);
            }, 3000);
        }, 1000);
    };

    return (
        <div className={styles.contactPage}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Contacto</h1>
                    <p>¿Tienes alguna pregunta o comentario? ¡Escríbeme!</p>
                </header>

                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    <div className={styles.field}>
                        <label htmlFor="name">Nombre</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu nombre"
                            className={errors.name ? styles.inputError : ''}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                clearError('name');
                            }}
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        {errors.name && (
                            <span id="name-error" className={styles.error}>
                                {errors.name}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            className={errors.email ? styles.inputError : ''}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                clearError('email');
                            }}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                        {errors.email && (
                            <span id="email-error" className={styles.error}>
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="message">Mensaje</label>
                        <textarea
                            id="message"
                            placeholder="Escribe tu mensaje..."
                            rows={5}
                            className={errors.message ? styles.inputError : ''}
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                                clearError('message');
                            }}
                            aria-invalid={!!errors.message}
                            aria-describedby={errors.message ? 'message-error' : undefined}
                        />
                        <div className={styles.fieldFooter}>
                            {errors.message ? (
                                <span id="message-error" className={styles.error}>
                                    {errors.message}
                                </span>
                            ) : (
                                <span />
                            )}
                            <span className={styles.counter}>{message.trim().length} caracteres</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`btn btn-primary ${styles.submit}`}
                        disabled={isSending || isSubmitted}
                    >
                        {isSending ? 'Enviando...' : 'Enviar mensaje'}
                    </button>

                    {isSubmitted && (
                        <div className={styles.success} role="status">
                            ✅ ¡Mensaje enviado exitosamente! Te responderé pronto.
                        </div>
                    )}
                </form>
            </div>
        </div>
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

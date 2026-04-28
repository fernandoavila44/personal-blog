'use client';

import { useState } from 'react';
import styles from './page.module.scss';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: any = {};

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

    // Limpiar formulario después de 3 segundos
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <h1>Contacto</h1>
      <p>¿Tienes alguna pregunta o comentario? ¡Escríbeme!</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? styles.inputError : ''}
            placeholder="Tu nombre"
          />
          {errors.name && <span className={styles.errorText}>{errors.name}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? styles.inputError : ''}
            placeholder="tu.email@ejemplo.com"
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className={errors.message ? styles.inputError : ''}
            placeholder="Escribe tu mensaje aquí..."
          />
          {errors.message && <span className={styles.errorText}>{errors.message}</span>}
        </div>

        <button type="submit" className={styles.submitBtn}>
          Enviar mensaje
        </button>

        {isSubmitted && (
          <div className={styles.successMsg}>
            ¡Mensaje enviado exitosamente! Te responderé pronto.
          </div>
        )}
      </form>
    </div>
  );
}

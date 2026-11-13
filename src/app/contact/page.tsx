'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import styles from './page.module.scss';

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(false);

    const newErrors: FormErrors = {};

    if (name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Escribe un correo electrónico válido.';
    }

    if (message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  }

  return (
    <div className={styles.contactPage}>
      <h1>Contacto</h1>
      <p>¿Tienes alguna pregunta o comentario? Escríbeme.</p>

      <form
        onSubmit={handleSubmit}
        onChange={() => setIsSubmitted(false)}
        noValidate
      >
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" role="alert">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" role="alert">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" role="alert">{errors.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar mensaje
        </button>

        {isSubmitted && (
          <p role="status">
            ¡Formulario validado! Envío simulado correctamente.
          </p>
        )}
      </form>
    </div>
  );
}
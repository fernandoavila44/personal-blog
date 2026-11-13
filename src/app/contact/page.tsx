"use client";

import { useState } from "react";
import styles from "./page.module.scss";

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Por favor ingresa un email válido";
    }

    if (!message.trim() || message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setIsSubmitted(false);
      return;
    }

    setIsSubmitted(true);

    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <main className={styles.contactPage}>
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
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: undefined }));
                setIsSubmitted(false);
              }}
              placeholder="Ingresa tu nombre"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <span id="name-error" className={styles.error}>
                {errors.name}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: undefined }));
                setIsSubmitted(false);
              }}
              placeholder="ejemplo@correo.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
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
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setErrors((prev) => ({ ...prev, message: undefined }));
                setIsSubmitted(false);
              }}
              placeholder="Escribe tu mensaje..."
              rows={6}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
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

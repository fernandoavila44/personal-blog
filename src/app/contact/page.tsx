'use client';

import { useMemo, useState } from 'react';

type FormState = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });

  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    name: false,
    email: false,
    message: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    const next: Partial<Record<keyof FormState, string>> = {};

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name) next.name = 'El nombre es obligatorio.';
    if (!email) {
      next.email = 'El email es obligatorio.';
    } else {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) next.email = 'Escribe un email válido.';
    }

    if (!message) next.message = 'El mensaje es obligatorio.';
    if (message && message.length < 10) next.message = 'Escribe al menos 10 caracteres.';

    return next;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  const onChange =
    (key: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSubmitted(false);
        setForm((prev) => ({ ...prev, [key]: e.target.value }));
      };

  const onBlur = (key: keyof FormState) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // marcar todo como "touched" para mostrar errores si los hay
    setTouched({ name: true, email: true, message: true });

    if (!isValid) return;

    // Simulación de envío (en un proyecto real, aquí harías fetch a una API)
    setSubmitted(true);

    // limpiar formulario
    setForm({ name: '', email: '', message: '' });
    setTouched({ name: false, email: false, message: false });
  };

  return (
    <section style={{ maxWidth: 820, margin: '0 auto', padding: '3rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Contacto</h1>
      <p style={{ opacity: 0.8, marginBottom: '1.5rem' }}>
        Escríbeme y te respondo lo antes posible.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gap: '1rem',
          padding: '1.25rem',
          border: '1px solid #e5e5e5',
          borderRadius: 12,
        }}
      >
        <div style={{ display: 'grid', gap: '0.4rem' }}>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            placeholder="Tu nombre"
            value={form.name}
            onChange={onChange('name')}
            onBlur={onBlur('name')}
            style={{ padding: '0.7rem 0.8rem', borderRadius: 10, border: '1px solid #dcdcdc' }}
          />
          {touched.name && errors.name && (
            <small style={{ color: 'crimson' }}>{errors.name}</small>
          )}
        </div>

        <div style={{ display: 'grid', gap: '0.4rem' }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="tuemail@correo.com"
            value={form.email}
            onChange={onChange('email')}
            onBlur={onBlur('email')}
            style={{ padding: '0.7rem 0.8rem', borderRadius: 10, border: '1px solid #dcdcdc' }}
          />
          {touched.email && errors.email && (
            <small style={{ color: 'crimson' }}>{errors.email}</small>
          )}
        </div>

        <div style={{ display: 'grid', gap: '0.4rem' }}>
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            rows={6}
            placeholder="Escribe tu mensaje..."
            value={form.message}
            onChange={onChange('message')}
            onBlur={onBlur('message')}
            style={{ padding: '0.7rem 0.8rem', borderRadius: 10, border: '1px solid #dcdcdc' }}
          />
          {touched.message && errors.message && (
            <small style={{ color: 'crimson' }}>{errors.message}</small>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          style={{
            justifySelf: 'start',
            padding: '0.7rem 1.1rem',
            borderRadius: 10,
            border: '1px solid #111',
            background: isValid ? '#111' : '#888',
            color: '#fff',
            cursor: isValid ? 'pointer' : 'not-allowed',
          }}
        >
          Enviar
        </button>

        {submitted && (
          <div style={{ padding: '0.8rem 1rem', borderRadius: 10, background: '#e9fff0' }}>
            ✅ Mensaje enviado (simulado). ¡Gracias por escribir!
          </div>
        )}
      </form>
    </section>
  );
}

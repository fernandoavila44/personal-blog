'use client';

import { useState } from 'react';

type Errors = {
  name?: string;
  email?: string;
  message?: string;
};

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Errors = {};

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

    // Simulación de envío
    console.log({ name, email, message });

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
    <div style={{ padding: '4rem 1.5rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Contacto</h1>
      <p>¿Tienes alguna pregunta o comentario? ¡Escríbeme!</p>

      <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Mensaje</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
        </div>

        <button type="submit" style={{ padding: '10px 20px' }}>
          Enviar mensaje
        </button>

        {isSubmitted && (
          <div style={{ marginTop: '1rem', color: 'green' }}>
            ¡Mensaje enviado exitosamente! 🚀
          </div>
        )}
      </form>
    </div>
  );
}

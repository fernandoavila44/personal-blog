'use client';

import { useState } from 'react';
import styles from './Contact.module.scss';

export default function ContactPage() {

  //Estados
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  //Validación
  const validate = () => {
    const newErrors: any = {};

    if (!name || name.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!message || message.length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    return newErrors;
  };

  //Envío
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

  // return (
  //   <div style={{ padding: '2rem', maxWidth: '600px' }}>
  //     <h1>Contacto</h1>
  //     <p>¿Tienes alguna pregunta o comentario? ¡Escríbeme!</p>

  //     <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>

  //       {/* Nombre */}
  //       <div>
  //         <label>Nombre</label>
  //         <br />
  //         <input
  //           type="text"
  //           value={name}
  //           onChange={(e) => setName(e.target.value)}
  //         />
  //         {errors.name && (
  //           <p style={{ color: 'red' }}>{errors.name}</p>
  //         )}
  //       </div>

  //       <br />

  //       {/* Email */}
  //       <div>
  //         <label>Email</label>
  //         <br />
  //         <input
  //           type="email"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //         />
  //         {errors.email && (
  //           <p style={{ color: 'red' }}>{errors.email}</p>
  //         )}
  //       </div>

  //       <br />

  //       {/* Mensaje */}
  //       <div>
  //         <label>Mensaje</label>
  //         <br />
  //         <textarea
  //           value={message}
  //           onChange={(e) => setMessage(e.target.value)}
  //           rows={5}
  //         />
  //         {errors.message && (
  //           <p style={{ color: 'red' }}>{errors.message}</p>
  //         )}
  //       </div>

  //       <br />

  //       <button type="submit">
  //         Enviar mensaje
  //       </button>

  //       {isSubmitted && (
  //         <p style={{ color: 'green', marginTop: '1rem' }}>
  //           ¡Mensaje enviado exitosamente! Te responderé pronto.
  //         </p>
  //       )}

  //     </form>
  //   </div>
  // );
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contacto</h1>
      <p className={styles.subtitle}>
        ¿Tienes alguna pregunta o comentario? ¡Escríbeme!
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>

        {/* Nombre */}
        <div className={styles.field}>
          <label className={styles.label}>Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
          {errors.name && (
            <p className={styles.error}>{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email}</p>
          )}
        </div>

        {/* Mensaje */}
        <div className={styles.field}>
          <label className={styles.label}>Mensaje</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className={styles.textarea}
          />
          {errors.message && (
            <p className={styles.error}>{errors.message}</p>
          )}
        </div>

        <button type="submit" className={styles.button}>
          Enviar mensaje
        </button>

        {isSubmitted && (
          <p className={styles.success}>
            ¡Mensaje enviado exitosamente! Te responderé pronto.
          </p>
        )}

      </form>
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

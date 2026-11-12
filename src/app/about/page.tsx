import type { Metadata } from 'next';
import authorData from '@/data/author.json';
import styles from './page.module.scss';

/*
 * Página "Sobre mí" con SSR (Server-Side Rendering).
 *
 * - Es un Server Component (no tiene 'use client'): se ejecuta en el servidor
 *   y no envía JavaScript al navegador.
 * - `dynamic = 'force-dynamic'` obliga a Next.js a renderizarla en cada request (SSR)
 *   en lugar de generarla estáticamente en el build.
 * - En un caso real, authorData podría venir de un fetch a una API o base de datos.
 */

export const dynamic = 'force-dynamic';

const author = authorData;

// BONUS: metadata dinámica para SEO
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Sobre ${author.name} | Mi Blog Personal`,
        description: author.bio,
    };
}

// Iniciales para el avatar (la imagen /images/avatar.jpg no existe en el proyecto)
function getInitials(name: string) {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join('');
}

const socialLinks = [
    { label: 'GitHub', url: author.social.github },
    { label: 'LinkedIn', url: author.social.linkedin },
    { label: 'Twitter', url: author.social.twitter },
];

export default function AboutPage() {
    // Hora en que el servidor generó la página: cambia en cada recarga (prueba de SSR)
    const renderedAt = new Date().toLocaleTimeString('es-ES');

    return (
        <div className={styles.aboutPage}>
            {/* Header con foto y nombre */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.avatar} aria-hidden="true">
                        {getInitials(author.name)}
                    </div>
                    <h1 className={styles.name}>{author.name}</h1>
                    <p className={styles.role}>{author.role}</p>
                    <p className={styles.location}>📍 {author.location}</p>
                </div>
            </section>

            <div className={`container ${styles.content}`}>
                <div className={styles.mainColumn}>
                    {/* Biografía */}
                    <section className={styles.card}>
                        <h2>Sobre mí</h2>
                        <p>{author.bio}</p>
                    </section>

                    {/* Skills */}
                    <section className={styles.card}>
                        <h2>Habilidades</h2>
                        <ul className={styles.skills}>
                            {author.skills.map((skill) => (
                                <li key={skill} className={styles.skill}>
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <aside className={styles.sideColumn}>
                    {/* Experiencia y educación */}
                    <section className={styles.card}>
                        <h3>💼 Experiencia</h3>
                        <p>{author.experience}</p>

                        <h3>🎓 Educación</h3>
                        <p>{author.education}</p>
                    </section>

                    {/* Redes sociales */}
                    <section className={styles.card}>
                        <h3>Contacto y redes</h3>
                        <a href={`mailto:${author.email}`} className={styles.email}>
                            ✉️ {author.email}
                        </a>
                        <div className={styles.social}>
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.socialButton}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </section>
                </aside>
            </div>

            <p className={styles.renderInfo}>
                Página renderizada en el servidor a las {renderedAt}
            </p>
        </div>
    );
}

/* PREGUNTAS PARA REFLEXIONAR:
 *
 * 1. ¿Por qué usar SSR para esta página en lugar de SSG?
 *    Respuesta: En este ejemplo, podríamos usar SSG también. Pero SSR es útil
 *    si los datos cambian frecuentemente o necesitas datos en tiempo real.
 *    Esta página es un ejercicio para practicar SSR.
 *
 * 2. ¿Cuál es la diferencia entre un Server Component y un Client Component?
 *    Respuesta: Server Components se ejecutan en el servidor, no envían JS al cliente,
 *    y pueden acceder directamente a bases de datos. Client Components ('use client')
 *    se ejecutan en el navegador y permiten interactividad (hooks, eventos).
 *
 * 3. ¿Puedes usar hooks como useState en este componente?
 *    Respuesta: No, porque es un Server Component. Para usar hooks necesitas
 *    agregar 'use client' al inicio del archivo.
 */

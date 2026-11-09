import Image from 'next/image';
import { connection } from 'next/server';
import type { Metadata } from 'next';

import authorData from '@/data/author.json';
import styles from './page.module.scss';

// Metadata para SEO
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Sobre ${authorData.name} | Mi Blog Personal`,
        description: authorData.bio
    };
}

export default async function AboutPage() {
    // Esperar a la conexión para habilitar renderizado dinámico
    await connection();

    const author = authorData;

    return (
        <main className={styles.aboutPage}>
            <section className={styles.profile}>
                <div className={styles.avatarContainer}>
                    <Image
                        src={author.avatar}
                        alt={`Foto de ${author.name}`}
                        width={250}
                        height={250}
                        priority
                        className={styles.avatar}
                    />
                </div>

                <div className={styles.profileInfo}>
                    <h1>{author.name}</h1>
                    <h2>{author.role}</h2>

                    <p className={styles.location}>
                        <span>📍</span> {author.location}
                    </p>

                    <a
                        href={`mailto:${author.email}`}
                        className={styles.email}
                    >
                        {author.email}
                    </a>

                    <div className={styles.socialLinks}>
                        <a href={author.social.github} target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>

                        <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer">
                            LinkedIn
                        </a>

                        <a href={author.social.twitter} target="_blank" rel="noopener noreferrer">
                            Twitter
                        </a>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h2>Sobre mí</h2>
                <p>{author.bio}</p>
            </section>

            <section className={styles.section}>
                <h2>Habilidades</h2>

                <div className={styles.skillsGrid}>
                    {author.skills.map((skill) => (
                        <span key={skill} className={styles.skill}>
                            {skill}
                        </span>
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <h2>Experiencia</h2>
                <p>{author.experience}</p>
            </section>

            <section className={styles.section}>
                <h2>Educación</h2>
                <p>{author.education}</p>
            </section>
        </main>
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

/* BONUS: Implementar generateMetadata
export async function generateMetadata() {
  return {
    title: `Sobre ${authorData.name} | Mi Blog Personal`,
    description: authorData.bio,
  };
}
*/

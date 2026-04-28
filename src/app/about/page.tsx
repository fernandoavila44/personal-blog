import Image from 'next/image';
import authorData from '@/data/author.json';
import styles from './page.module.scss';

const author = authorData;

export async function generateMetadata() {
    return {
        title: `Sobre mí | ${author.name}`,
        description: author.bio
    };
}

export default function AboutPage() {
    return (
        <div className={styles.aboutPage}>
            <div className="container">

                <section className={styles.header}>
                    <Image
                        src={author.avatar}
                        alt={author.name}
                        width={180}
                        height={180}
                        className={styles.avatar}
                    />

                    <div>
                        <h1>{author.name}</h1>
                        <h2>{author.role}</h2>
                        <p>{author.bio}</p>
                    </div>
                </section>

                <section className={styles.section}>
                    <h3>Skills</h3>

                    <div className={styles.skillsGrid}>
                        {author.skills.map((skill, index) => (
                            <div key={index} className={styles.card}>
                                {skill}
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <h3>Experiencia</h3>
                    <p>{author.experience}</p>
                </section>

                <section className={styles.section}>
                    <h3>Educación</h3>
                    <p>{author.education}</p>
                </section>

                <section className={styles.section}>
                    <h3>Redes Sociales</h3>

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
                </section>

            </div>
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

/* BONUS: Implementar generateMetadata
export async function generateMetadata() {
  return {
    title: `Sobre ${authorData.name} | Mi Blog Personal`,
    description: authorData.bio,
  };
}
*/

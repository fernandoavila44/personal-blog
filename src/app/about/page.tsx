import Image from 'next/image';
import authorData from '@/data/author.json';
import styles from './page.module.scss';

interface Author {
    name: string;
    role: string;
    bio: string;
    image: string;
    skills: string[];
    experience: {
        company: string;
        role: string;
        period: string;
        description: string;
    }[];
    education: {
        institution: string;
        degree: string;
        period: string;
    }[];
    social: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        website?: string;
    };
}

const author = authorData as Author;


/*
SEO DINÁMICO
*/

export async function generateMetadata() {

    return {
        title: `Sobre mí | ${author.name}`,
        description: author.bio,
    };

}


/*
SERVER COMPONENT (SSR)
*/

export default function AboutPage() {

    return (

        <div className={styles.aboutPage}>

            <div className="container">

                {/* HEADER */}
                <section className={styles.header}>

                    <div className={styles.imageContainer}>

                        <Image
                            src={author.image}
                            alt={author.name}
                            width={180}
                            height={180}
                            className={styles.profileImage}
                            priority
                        />

                    </div>

                    <div>

                        <h1>{author.name}</h1>

                        <h2 className={styles.role}>
                            {author.role}
                        </h2>

                        <p className={styles.bio}>
                            {author.bio}
                        </p>

                        {/* SOCIAL */}
                        <div className={styles.social}>

                            {author.social.github && (
                                <a
                                    href={author.social.github}
                                    target="_blank"
                                >
                                    GitHub
                                </a>
                            )}

                            {author.social.linkedin && (
                                <a
                                    href={author.social.linkedin}
                                    target="_blank"
                                >
                                    LinkedIn
                                </a>
                            )}

                            {author.social.twitter && (
                                <a
                                    href={author.social.twitter}
                                    target="_blank"
                                >
                                    Twitter
                                </a>
                            )}

                            {author.social.website && (
                                <a
                                    href={author.social.website}
                                    target="_blank"
                                >
                                    Website
                                </a>
                            )}

                        </div>

                    </div>

                </section>


                {/* SKILLS */}
                <section className={styles.section}>

                    <h2>Skills</h2>

                    <div className={styles.skillsGrid}>

                        {author.skills.map(skill => (
                            <div
                                key={skill}
                                className={styles.skillCard}
                            >
                                {skill}
                            </div>
                        ))}

                    </div>

                </section>


                {/* EXPERIENCE */}
                <section className={styles.section}>

                    <h2>Experiencia</h2>

                    {author.experience.map((exp, index) => (

                        <div
                            key={index}
                            className={styles.card}
                        >

                            <h3>{exp.role}</h3>

                            <p className={styles.company}>
                                {exp.company}
                            </p>

                            <span className={styles.period}>
                                {exp.period}
                            </span>

                            <p>
                                {exp.description}
                            </p>

                        </div>

                    ))}

                </section>


                {/* EDUCATION */}
                <section className={styles.section}>

                    <h2>Educación</h2>

                    {author.education.map((edu, index) => (

                        <div
                            key={index}
                            className={styles.card}
                        >

                            <h3>{edu.degree}</h3>

                            <p>
                                {edu.institution}
                            </p>

                            <span>
                                {edu.period}
                            </span>

                        </div>

                    ))}

                </section>


            </div>

        </div>

    );
}

/* 
 * EJERCICIO: Implementar página "Sobre mí" con SSR (Server-Side Rendering)
 * 
 * CONCEPTOS A APRENDER:
 * - Server Components: Componentes que se ejecutan en el servidor
 * - SSR: Renderizado en el servidor en cada request
 * - Data fetching en Server Components
 * 
 * PASOS A SEGUIR:
 * 
 * 1. Importar los datos del autor
 *    - Ya está disponible en @/data/author.json
 *    - En un caso real, esto podría ser un fetch a una API
 * 
 * 2. Crear el JSX para mostrar:
 *    - Foto de perfil (usar next/image)
 *    - Nombre y rol
 *    - Biografía
 *    - Skills/habilidades
 *    - Experiencia y educación
 *    - Enlaces a redes sociales
 * 
 * 3. Crear estilos en page.module.scss
 *    - Layout atractivo (puede ser dos columnas en desktop)
 *    - Cards para skills
 *    - Botones para redes sociales
 * 
 * 4. BONUS: Agregar metadata dinámica
 *    - Usar generateMetadata() para SEO
 */

// TODO: Descomentar y usar authorData
// const author = authorData;



        /* TODO: Agregar secciones:
       * - Header con foto y nombre
       * - Biografía
       * - Skills
       * - Experiencia
       * - Educación
       * - Redes sociales
       */


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

import Image from 'next/image';
import authorData from '@/data/author.json';
import styles from './page.module.scss';

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

/* BONUS: Implementar generateMetadata */
export async function generateMetadata() {
  return {
    title: `Sobre ${authorData.name} | Mi Blog Personal`,
    description: authorData.bio,
  };
}

export default function AboutPage() {
    // TODO: Implementar la página
    return (
        <div className={styles.aboutContainer}>
            {/* Sidebar / Profile Card */}
            <aside className={styles.profileCard}>
                <div className={styles.avatarWrapper}>
                    {/* Using a placeholder avatar for now if the real one isn't in public/images */}
                    <Image 
                        src={authorData.avatar || 'https://via.placeholder.com/200'} 
                        alt={`Avatar de ${authorData.name}`}
                        fill
                        sizes="200px"
                    />
                </div>
                <h1>{authorData.name}</h1>
                <p className={styles.role}>{authorData.role}</p>
                <p className={styles.location}>📍 {authorData.location}</p>
                
                <div className={styles.socialLinks}>
                    <a href={authorData.social.github} target="_blank" rel="noopener noreferrer">GH</a>
                    <a href={authorData.social.linkedin} target="_blank" rel="noopener noreferrer">IN</a>
                    <a href={authorData.social.twitter} target="_blank" rel="noopener noreferrer">TW</a>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className={styles.contentArea}>
                <section className={styles.section}>
                    <h2>Sobre mí</h2>
                    <p>{authorData.bio}</p>
                </section>

                <section className={styles.section}>
                    <h2>Habilidades Técnicas</h2>
                    <div className={styles.skillsGrid}>
                        {authorData.skills.map(skill => (
                            <span key={skill} className={styles.skillBadge}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <h2>Trayectoria</h2>
                    <div className={styles.infoItem}>
                        <h3>Experiencia</h3>
                        <p>{authorData.experience}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <h3>Educación</h3>
                        <p>{authorData.education}</p>
                    </div>
                </section>
            </div>
            
            {/* TODO: Agregar secciones:
             * - Header con foto y nombre
             * - Biografía
             * - Skills
             * - Experiencia
             * - Educación
             * - Redes sociales
             */}
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

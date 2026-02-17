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

// TODO: Descomentar y usar authorData
const author = authorData;

export default function AboutPage() {
  // TODO: Implementar la página

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <div className={styles.aboutPage}>
        <header className={styles.hero}>
          <h1>{author.name}</h1>
          <p className={styles.role}>{author.role}</p>
        </header>

        <section className={styles.bio}>
          <h2>Sobre mí</h2>
          <p>{author.bio}</p>
        </section>

        <section className={styles.skills}>
          <h2>Habilidades</h2>
          <ul className={styles.skillsList}>
            {author.skills.map((skill: string) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>

        <section className={styles.social}>
          <h2>Redes</h2>
          <div className={styles.socialLinks}>
            <a href={author.social.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={author.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={author.social.twitter} target="_blank" rel="noreferrer">Twitter</a>
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

import authorData from '@/data/author.json';
import Image from 'next/image';
// import styles from './page.module.scss';

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

export async function generateMetadata() {
  return {
    title: `Sobre ${authorData.name} | Mi Blog Personal`,
    description: authorData.bio,
  };
}

export default function AboutPage() {
  // TODO: Implementar la página
  const author = authorData;

return (
    <div>
      
      {/* Header */}
      <div>
        <Image
          src={author.avatar}
          alt={author.name}
          width={150}
          height={150}
        />
        <div>
          <h1>{author.name}</h1>
          <h2>{author.role}</h2>
          <p>{author.location}</p>
        </div>
      </div>

      {/* Bio */}
      <section>
        <h3>Biografía</h3>
        <p>{author.bio}</p>
      </section>

      {/* Skills */}
      <section>
        <h3>Skills</h3>
        <div>
          {author.skills.map((skill: string) => (
            <span key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Experiencia */}
      <section>
        <h3>Experiencia</h3>
        <p>{author.experience}</p>
      </section>

      {/* Educación */}
      <section>
        <h3>Educación</h3>
        <p>{author.education}</p>
      </section>

      {/* Contacto y Redes */}
      <section>
        <h3>Contacto</h3>
        <p>Email: {author.email}</p>

        <div>
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

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
// const author = authorData;

// export default function AboutPage() {
//     // TODO: Implementar la página

//     return (
//         <div className="container" style={{ padding: '4rem 1.5rem' }}>
//             <h1>Sobre Mí</h1>
//             <p>TODO: Implementar página "Sobre mí"</p>

//             {/* TODO: Agregar secciones:
//        * - Header con foto y nombre
//        * - Biografía
//        * - Skills
//        * - Experiencia
//        * - Educación
//        * - Redes sociales
//        */}
//         </div>
//     );
// }


/*
  Página "Sobre mí"
  Server Component (por defecto)
  → No lleva 'use client'
  → Se renderiza en el servidor (SSR)
*/

export default function AboutPage() {

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>

      {/* Hero */}
      <div>
        <h1>{authorData.name}</h1>
        <p>{authorData.role}</p>
      </div>

      <hr />

      {/* Biografía */}
      <div>
        <h2>Sobre mí</h2>
        <p>{authorData.bio}</p>
      </div>

      <hr />

      {/* Skills */}
      <div>
        <h2>Habilidades</h2>
        <ul>
          {authorData.skills.map((skill: string) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>

      <hr />

      {/* Redes Sociales */}
      <div>
        <h2>Redes</h2>
        <a href={authorData.social.github} target="_blank">
          GitHub
        </a>
        <a href={authorData.social.linkedin} target="_blank">
          linkedin
        </a>
      </div>

    </div>
  )
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

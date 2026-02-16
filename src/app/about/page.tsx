import authorData from '@/data/author.json';
import styles from './page.module.scss';

export default function AboutPage() {
  return ( 
    <div className={styles.container}>

      {/* Hero */}
      <div className={`${styles.section} ${styles.hero}`}>
        <h1>{authorData.name}</h1>
        <p>{authorData.role}</p>
      </div>

      {/* Biografía */}
      <div className={styles.section}>
        <h2>Sobre mí</h2>
        <p>{authorData.bio}</p>
      </div>

      {/* Skills */}
      <div className={styles.section}>
        <h2>Habilidades</h2>
        <ul className={styles.skills}>
          {authorData.skills.map((skill: string) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* Redes Sociales */}
      <div className={`${styles.section} ${styles.social}`}>
        <a href={authorData.social.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={authorData.social.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>

    </div>
    
  );

}
//   return (
//     <div className="container" style={{ padding: '4rem 1.5rem' }}>

//       {/* Hero */}
//       <div>
//         <h1>{authorData.name}</h1>
//         <p>{authorData.role}</p>
//       </div>

//       <hr />

//       {/* Biografía */}
//       <div>
//         <h2>Sobre mí</h2>
//         <p>{authorData.bio}</p>
//       </div>

//       <hr />

//       {/* Skills */}
//       <div>
//         <h2>Habilidades</h2>
//         <ul>
//           {authorData.skills.map((skill: string) => (
//             <li key={skill}>{skill}</li>
//           ))}
//         </ul>
//       </div>

//       <hr />

//       {/* Redes Sociales */}
//       <div>
//         <h2>Redes</h2>
//         <a href={authorData.social.github} target="_blank">
//           GitHub
//         </a>
//         <a href={authorData.social.linkedin} target="_blank">
//           linkedin
//         </a>
//       </div>

//     </div>
//   )
// }


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

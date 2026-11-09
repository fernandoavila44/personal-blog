import authorData from '@/data/author.json';
import Image from 'next/image';

const author = authorData
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

export default function AboutPage() {
    // TODO: Implementar la página

    return (
        <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                {author.avatar && (
                    <Image 
                        src={author.avatar} 
                        alt={author.name} 
                        width={120} 
                        height={120} 
                        style={{ borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }}
                    />
                )}
                <h1>{author.name}</h1>
                <p style={{ fontSize: '1.2rem', color: '#666' }}>{author.role}</p>
            </div>

            <section style={{ marginBottom: '2rem' }}>
                <h2>Sobre mí</h2>
                <p style={{ lineHeight: '1.6' }}>{author.bio}</p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2>Habilidades</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {Array.isArray(author.skills) ? (
                        author.skills.map((skill: string) => (
                            <span key={skill} style={{ background: '#eee', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                                {skill}
                            </span>
                        ))
                    ) : (
                        <p>{author.skills}</p>
                    )}
                </div>
            </section>

            {author.experience && (
                <section style={{ marginBottom: '2rem' }}>
                    <h2>Experiencia</h2>
                    {Array.isArray(author.experience) ? (
                        <ul>
                            {author.experience.map((exp: any, index: number) => (
                                <li key={index} style={{ marginBottom: '0.8rem' }}>
                                    <strong>{exp.role}</strong> en {exp.company} ({exp.period})
                                    <p>{exp.description}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p style={{ lineHeight: '1.6' }}>{author.experience}</p>
                    )}
                </section>
            )}

            {author.education && (
                <section style={{ marginBottom: '2rem' }}>
                    <h2>Educación</h2>
                    {Array.isArray(author.education) ? (
                        <ul>
                            {author.education.map((edu: any, index: number) => (
                                <li key={index}>
                                    {edu.degree} - {edu.institution} ({edu.year})
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p style={{ lineHeight: '1.6' }}>{author.education}</p>
                    )}
                </section>
            )}

            <section>
                <h2>Redes Sociales</h2>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    {author.social?.github && <a href={author.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
                    {author.social?.twitter && <a href={author.social.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>}
                    {author.social?.linkedin && <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                </div>
            </section>
        </div>
    );
}


export async function generateMetadata() {
  return {
    title: `Sobre ${authorData.name} | Mi Blog Personal`,
    description: authorData.bio,
  };
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

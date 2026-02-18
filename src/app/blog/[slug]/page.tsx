import { notFound } from 'next/navigation';
import Link from 'next/link';
import postsData from '@/data/posts.json';
// import styles from './page.module.scss';

interface Post {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    date: string;
    category: string;
    readTime: string;
    content?: string;
    author?: string;
}

const posts = postsData as Post[];


export async function generateStaticParams() {

    return posts.map(post => ({
        slug: post.slug
    }));

}


/*
PAGE COMPONENT
*/

export default function PostPage({
    params
}: {
    params: { slug: string }
}) {

    // Buscar el post
    const post = posts.find(
        post => post.slug === params.slug
    );

    // Si no existe → 404
    if (!post) {
        notFound();
    }

    return (

        <article
            style={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: '40px 20px',
                lineHeight: '1.7'
            }}
        >

            {/* BOTÓN VOLVER */}
            <Link href="/blog">
                ← Volver al blog
            </Link>


            {/* HEADER */}
            <header style={{ marginBottom: '30px' }}>

                <h1 style={{
                    fontSize: '2.5rem',
                    marginBottom: '10px'
                }}>
                    {post.title}
                </h1>

                <div style={{
                    display: 'flex',
                    gap: '15px',
                    flexWrap: 'wrap',
                    color: '#666',
                    fontSize: '14px'
                }}>

                    <span>{post.date}</span>

                    <span>•</span>

                    <span>{post.category}</span>

                    <span>•</span>

                    <span>{post.readTime}</span>

                    {post.author && (
                        <>
                            <span>•</span>
                            <span>Por {post.author}</span>
                        </>
                    )}

                </div>

            </header>


            {/* CONTENT */}
            <section style={{
                fontSize: '18px'
            }}>

                {post.content ? (
                    <div>
                        {post.content}
                    </div>
                ) : (
                    <p>No hay contenido disponible.</p>
                )}

            </section>


            {/* FOOTER */}
            <footer style={{
                marginTop: '40px'
            }}>

                <Link href="/blog">
                    ← Volver al blog
                </Link>

            </footer>

        </article>

    );
}


/* 
 * EJERCICIO: Implementar página de post individual con SSG (Static Site Generation)
 * 
 * CONCEPTOS A APRENDER:
 * - generateStaticParams: Pre-renderiza páginas estáticas en build time
 * - Dynamic routes: [slug] para rutas dinámicas
 * - notFound(): Manejo de páginas no encontradas
 * 
 * PASOS A SEGUIR:
 * 
 * 1. Implementar generateStaticParams()
 *    Esta función le dice a Next.js qué páginas generar estáticamente
 *    Debe retornar un array de objetos con los slugs de todos los posts
 *    Ejemplo: [{ slug: 'post-1' }, { slug: 'post-2' }]
 * 
 * 2. Implementar la función del componente
 *    - Recibe params con el slug del post
 *    - Buscar el post en postsData usando el slug
 *    - Si no existe, llamar notFound()
 *    - Si existe, renderizar el contenido del post
 * 
 * 3. Crear el JSX para mostrar:
 *    - Título del post
 *    - Metadata (fecha, categoría, tiempo de lectura, autor)
 *    - Contenido del post
 *    - Botón para volver al blog
 *    - BONUS: Agregar CommentSection component (otro ejercicio)
 * 
 * 4. Crear estilos en page.module.scss
 *    - Estilos para el artículo
 *    - Tipografía legible
 *    - Espaciado adecuado
 */

// TODO: Implementar generateStaticParams
// export async function generateStaticParams() {
//   // Tu código aquí
//   // Pista: Mapear postsData para obtener solo los slugs
// }

// TODO: Implementar el componente de la página

    // TODO: Buscar el post usando params.slug
    // const post = postsData.find(p => p.slug === params.slug);

    // TODO: Si no existe el post, llamar notFound()
    // if (!post) {
    //   notFound();
    // }

 

/* PREGUNTAS PARA REFLEXIONAR:
 * 
 * 1. ¿Por qué usar SSG en lugar de SSR para posts de blog?
 *    Respuesta: Los posts de blog son contenido estático que no cambia frecuentemente.
 *    SSG genera HTML en build time, lo que resulta en páginas ultra-rápidas.
 * 
 * 2. ¿Cuándo se ejecuta generateStaticParams?
 *    Respuesta: Durante el build (npm run build), no en cada request.
 * 
 * 3. ¿Qué pasa si visitas un slug que no existe?
 *    Respuesta: Next.js mostrará la página 404 gracias a notFound().
 */

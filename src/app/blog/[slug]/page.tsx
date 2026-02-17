import { notFound } from 'next/navigation';
import Link from 'next/link';
import postsData from '@/data/posts.json';
import styles from '../page.module.scss';
import CommentSection from '@/components/CommentSection';

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
export async function generateStaticParams() {
  return postsData.map((post) => ({
    slug: post.slug,
  }));
}


// TODO: Implementar el componente de la página
export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const post = postsData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className={styles.article}>
      <h1 className={styles.title}>{post.title}</h1>

      <div className={styles.meta}>
        <span>{post.date}</span>
        {post.category && <span> • {post.category}</span>}
        {post.readTime && <span> • {post.readTime}</span>}
        {post.author && <span> • {post.author}</span>}
      </div>

      <div className={styles.content}>{post.content}</div>

      <Link href="/blog" className={styles.backButton}>
        ← Volver al blog
      </Link>

      <CommentSection />
    </article>
  );
}

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



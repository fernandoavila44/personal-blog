import { notFound } from 'next/navigation'
import postsData from '@/data/posts.json'
import CommentSection from '@/components/CommentSection';

/*
   SSG - generateStaticParams
*/
export async function generateStaticParams() {
  return postsData.map((post) => ({
    slug: post.slug,
  }))
}

/*
   Página dinámica del post
*/
export default async function PostPage({ params }: { params: { slug: string } }) {

  // Buscar el post por slug

  const { slug } = await params;
  
  //const post = postsData.find((p) => p.slug === params.slug)
  const post = postsData.find((p) => p.slug === slug);

  // Si no existe → mostrar 404
  if (!post) {
    notFound()
  }

  return (
    <article>
      <h1>{post.title}</h1>

      <div>
        <time>{new Date(post.date).toLocaleDateString()}</time>
        <span> | {post.category}</span>
        <span> | {post.readTime}</span>
        <span> | {post.author}</span>
      </div>

      <hr />

      <CommentSection />

      <div>
        <p>{post.content}</p>
        
        <ul>
          <li>Item uno</li>
          <li>Item dos</li>
        </ul>

        <blockquote>
          Esta es una cita importante del artículo.
        </blockquote>

        <p>
          Ejemplo de <code>console.log()</code> inline.
        </p>

        <pre>
          <code>
            {`const saludo = "Hola mundo";`}
          </code>
        </pre>
      </div>
    </article>
  )
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
import { notFound } from 'next/navigation';
import Link from 'next/link';
import postsData from '@/data/posts.json';
import styles from './page.module.scss';
import CommentSection from '@/components/CommentSection';

export async function generateStaticParams() {
    return postsData.map((post) => ({
        slug: post.slug
    }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
    const post = postsData.find((p) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className={styles.postPage}>
            <div className="container">
                <article className={styles.article}>
                    <h1 className={styles.title}>{post.title}</h1>

                    <div className={styles.meta}>
                        <span>{post.date}</span>
                        <span>{post.category}</span>
                        <span>{post.readTime} min lectura</span>
                        <span>{post.author}</span>
                    </div>

                    <div className={styles.content}>
                        <p>{post.content}</p>
                    </div>

                    <Link href="/blog" className={styles.backButton}>
                        ← Volver al Blog
                    </Link>

                    {/* Componente de comentarios agregado aquí */}
                    <div style={{ marginTop: '4rem' }}>
                        <CommentSection />
                    </div>
                </article>
            </div>
        </div>
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

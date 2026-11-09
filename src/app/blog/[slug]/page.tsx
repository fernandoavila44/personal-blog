import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import postsData from '@/data/posts.json';
import CommentSection from '@/components/CommentSection';
import styles from './page.module.scss';

// Generar las rutas estáticas de todas las publicaciones
export function generateStaticParams() {
    return postsData.map((post) => ({
        slug: post.slug
    }));
}

// Página individual de publicación
export default async function PostPage({
    params
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const post = postsData.find((post) => post.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <main className={styles.postPage}>
            <article className={styles.article}>
                <Link href="/blog" className={styles.backLink}>
                    ← Volver al blog
                </Link>

                <header className={styles.header}>
                    <span className={styles.category}>{post.category}</span>
                    <h1 className={styles.title}>{post.title}</h1>

                    <div className={styles.metadata}>
                        <span>{post.author}</span>

                        <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('es-CO', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>

                        <span>{post.readTime} de lectura</span>
                    </div>
                </header>

                <div className={styles.imageContainer}>
                    <Image
                        src={post.image}
                        alt={post.title}
                        width={1200}
                        height={675}
                        priority
                        className={styles.image}
                    />
                </div>

                <div className={styles.content}>
                    {post.content}
                </div>

                <CommentSection />

                <footer className={styles.postFooter}>
                    <Link href="/blog" className={styles.backButton}>
                        ← Volver a todas las publicaciones
                    </Link>
                </footer>
            </article>
        </main>
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

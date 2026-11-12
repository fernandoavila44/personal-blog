import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import postsData from '@/data/posts.json';
import styles from './page.module.scss';

/*
 * Página de post individual con SSG (Static Site Generation).
 *
 * - generateStaticParams: le indica a Next.js qué slugs pre-renderizar en build time.
 * - dynamicParams = false: cualquier slug que no esté en la lista responde 404.
 * - notFound(): muestra la página 404 si el post no existe.
 *
 * Nota: en Next.js 15+ `params` es una Promesa, por eso el componente es async
 * y se hace `await params`.
 */

type PageProps = {
    params: Promise<{ slug: string }>;
};

// Solo se generan los slugs existentes; los demás dan 404
export const dynamicParams = false;

export async function generateStaticParams() {
    return postsData.map((post) => ({
        slug: post.slug,
    }));
}

// BONUS: metadata dinámica para SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = postsData.find((p) => p.slug === slug);

    if (!post) {
        return { title: 'Post no encontrado | Mi Blog Personal' };
    }

    return {
        title: `${post.title} | Mi Blog Personal`,
        description: post.excerpt,
    };
}

export default async function PostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = postsData.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    const formattedDate = new Date(post.date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className={styles.postPage}>
            <div className={styles.container}>
                <Link href="/blog" className={styles.backLink}>
                    ← Volver al blog
                </Link>

                <article className={styles.article}>
                    <header className={styles.header}>
                        <span className={styles.category}>{post.category}</span>
                        <h1 className={styles.title}>{post.title}</h1>

                        <div className={styles.meta}>
                            <span>✍️ {post.author}</span>
                            <time dateTime={post.date}>📅 {formattedDate}</time>
                            <span>⏱️ {post.readTime} de lectura</span>
                        </div>
                    </header>

                    <p className={styles.excerpt}>{post.excerpt}</p>

                    <div className={styles.content}>
                        <p>{post.content}</p>
                    </div>
                </article>

                <div className={styles.footer}>
                    <Link href="/blog" className="btn btn-primary">
                        ← Ver todos los posts
                    </Link>
                </div>
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

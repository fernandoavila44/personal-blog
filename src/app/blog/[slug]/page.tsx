import Link from 'next/link';
import { notFound } from 'next/navigation';
import postsData from '@/data/posts.json';
import CommentSection from '@/components/CommentSection';
import styles from './page.module.scss';

// 1. generateStaticParams: le dice a Next.js qué páginas generar en el build (SSG)
export async function generateStaticParams() {
    return postsData.map((post) => ({
        slug: post.slug,
    }));
}

// 2. Componente de la página
// En Next.js 16, params es una Promise y se debe usar await para leer el slug
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Buscar el post por slug
    const post = postsData.find(p => p.slug === slug);

    // Si no existe, mostrar la página 404
    if (!post) {
        notFound();
    }

    // 3. JSX del artículo
    return (
        <article className={styles.article}>
            <div className="container">
                <h1>{post.title}</h1>
                <div className={styles.meta}>
                    <time>{new Date(post.date).toLocaleDateString()}</time>
                    <span>{post.category}</span>
                    <span>{post.readTime}</span>
                    <span>{post.author}</span>
                </div>
                <div className={styles.content}>
                    {post.content}
                </div>
                <Link href="/blog" className={styles.backLink}>
                    ← Volver al blog
                </Link>
                <CommentSection />
            </div>
        </article>
    );
}
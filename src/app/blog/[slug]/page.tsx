import { notFound } from 'next/navigation';
import Link from 'next/link';
import postsData from '@/data/posts.json';
import CommentSection from '@/components/CommentSection';
import styles from './page.module.scss';

// Generar metadata dinámica para el SEO del post
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const post = postsData.find((p) => p.slug === params.slug);
    if (!post) {
        return {
            title: 'Post no encontrado',
        };
    }

    return {
        title: `${post.title} | Mi Blog Personal`,
        description: post.excerpt,
    };
}

// 1. Implementar generateStaticParams()
// Esta función le dice a Next.js qué páginas generar estáticamente
export async function generateStaticParams() {
    return postsData.map((post) => ({
        slug: post.slug,
    }));
}

// 2. Implementar el componente de la página
export default function PostPage({ params }: { params: { slug: string } }) {
    // Buscar el post usando params.slug
    const post = postsData.find((p) => p.slug === params.slug);

    // Si no existe el post, llamar notFound()
    if (!post) {
        notFound();
    }

    // 3. Crear el JSX para mostrar:
    return (
        <article className={styles.postPage}>
            <div className="container">
                <Link href="/blog" className={styles.backButton}>
                    &larr; Volver al blog
                </Link>

                <header className={styles.header}>
                    <div className={styles.meta}>
                        <span className={styles.category}>{post.category}</span>
                        <span className={styles.date}>{post.date}</span>
                        <span className={styles.readTime}>⏳ {post.readTime}</span>
                    </div>
                    <h1 className={styles.title}>{post.title}</h1>
                    <p className={styles.author}>Por {post.author}</p>
                </header>

                <div className={styles.content}>
                    <p>{post.content}</p>
                    
                    {/* El extracto también se puede mostrar si se desea:
                    <p className={styles.excerpt}><em>{post.excerpt}</em></p>
                    */}
                </div>
                
                <CommentSection postSlug={post.slug} />
            </div>
        </article>
    );
}

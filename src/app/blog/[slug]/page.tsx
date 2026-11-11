
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import postsData from '@/data/posts.json';
import Comments from '@/components/Comments';
import styles from './page.module.scss';

type Post = (typeof postsData)[number];

export function generateStaticParams() {
    return postsData.map((post) => ({
        slug: post.slug,
    }));
}

export const dynamicParams = false;

function getPost(slug: string): Post | undefined {
    return postsData.find((post) => post.slug === slug);
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getPost(slug);

    if (!post) {
        return {
            title: 'Publicación no encontrada',
        };
    }

    return {
        title: `${post.title} | SantiDev`,
        description: post.excerpt,
    };
}

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPost(slug);

    if (!post) {
        notFound();
    }

    const formattedDate = new Date(
        `${post.date}T12:00:00`
    ).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <main className={styles.postPage}>
            <Link href="/blog" className={styles.backLink}>
                ← Volver al blog
            </Link>

            <article className={styles.article}>
                <header className={styles.header}>
                    <span className={styles.category}>
                        {post.category}
                    </span>

                    <h1 className={styles.title}>
                        {post.title}
                    </h1>

                    <p className={styles.excerpt}>
                        {post.excerpt}
                    </p>

                    <div className={styles.metadata}>
                        <span>✍️ {post.author}</span>
                        <span>📅 {formattedDate}</span>
                        <span>⏱️ {post.readTime} de lectura</span>
                    </div>
                </header>

                <div className={styles.content}>
                    <p>{post.content}</p>
                </div>

                <footer className={styles.articleFooter}>
                    <p>
                        Categoría: <strong>{post.category}</strong>
                    </p>

                    <Link href="/blog" className={styles.backButton}>
                        Ver todas las publicaciones
                    </Link>
                </footer>
            </article>

            <Comments slug={post.slug} />
        </main>
    );
}

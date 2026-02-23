import { notFound } from 'next/navigation';
import Link from 'next/link';
import postsData from '@/data/posts.json';
import CommentSection from '@/components/CommentSection';
import styles from './page.module.scss';

export async function generateStaticParams() {
    return postsData.map((post) => ({
        slug: post.slug,
    }));
}

interface PostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params; // ✅ FIX para Next 16

    const post = postsData.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <article className={styles.post}>
            <div className="container">
                <header className={styles.header}>
                    <span className={styles.category}>{post.category}</span>
                    <h1 className={styles.title}>{post.title}</h1>

                    <div className={styles.meta}>
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <time>
                            {new Date(post.date).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                        <span>•</span>
                        <span>Por {post.author}</span>
                    </div>
                </header>

                <section className={styles.content}>
                    <p>{post.content}</p>
                </section>

                <footer className={styles.footer}>
                    <Link href="/blog" className={styles.backButton}>
                        ← Volver al blog
                    </Link>
                </footer>

                <CommentSection />
            </div>
        </article>
    );
}

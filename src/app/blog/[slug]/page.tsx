import Link from 'next/link';
import { notFound } from 'next/navigation';
import postsData from '@/data/posts.json';
import CommentSection from '@/components/CommentSection';
import styles from './page.module.scss';

export async function generateStaticParams() {
    return postsData.map((post) => ({
        slug: post.slug,
    }));
}

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = postsData.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <div className={styles.postPage}>
            <div className="container">
                <Link href="/blog" className={styles.backLink}>
                    ← Volver al blog
                </Link>

                <article className={styles.article}>
                    <header className={styles.header}>
                        <span className={styles.category}>{post.category}</span>
                        <h1>{post.title}</h1>
                        <div className={styles.meta}>
                            <span>{post.author}</span>
                            <span>·</span>
                            <time>
                                {new Date(post.date).toLocaleDateString('es-ES', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                            <span>·</span>
                            <span>{post.readTime}</span>
                        </div>
                    </header>

                    <div className={styles.content}>
                        <p>{post.content}</p>
                    </div>
                </article>

                <CommentSection />
            </div>
        </div>
    );
}

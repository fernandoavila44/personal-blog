import Link from 'next/link';
import { notFound } from 'next/navigation';
import CommentSection from '@/components/CommentSection';
import postsData from '@/data/posts.json';
import styles from './page.module.scss';

// Next.js crea una página estática por cada slug durante el build.
export function generateStaticParams() {
    return postsData.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = postsData.find((item) => item.slug === slug);

    if (!post) notFound();

    return (
        <article className={styles.post}>
            <div className="container">
                <Link href="/blog" className={styles.back}>← Volver al blog</Link>
                <header className={styles.header}>
                    <span>{post.category}</span>
                    <h1>{post.title}</h1>
                    <p>{post.date} · {post.readTime} de lectura · Por {post.author}</p>
                </header>
                <p className={styles.content}>{post.content}</p>
                <CommentSection />
            </div>
        </article>
    );
}

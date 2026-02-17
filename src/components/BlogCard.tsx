import Link from 'next/link';
import styles from './BlogCard.module.scss';

interface BlogCardProps {
    title: string;
    excerpt: string;
    slug: string;
    date: string;
    category: string;
    readTime: string;
    author?: string;
}

export default function BlogCard({ 
    title, 
    excerpt, 
    slug, 
    date, 
    category, 
    readTime,
    author = 'Valentina Herrera'
}: BlogCardProps) {
    return (
        <article className={styles.card}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <span className={styles.category}>{category}</span>
                    <span className={styles.readTime}>{readTime}</span>
                </div>

                <h3 className={styles.title}>
                    <Link href={`/blog/${slug}`}>
                        {title}
                    </Link>
                </h3>

                <p className={styles.excerpt}>{excerpt}</p>

                <div className={styles.footer}>
                    <div className={styles.metadata}>
                        <time className={styles.date}>{new Date(date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}</time>
                        <span className={styles.author}>{author}</span>
                    </div>

                    <Link href={`/blog/${slug}`} className={styles.readMore}>
                        Leer más →
                    </Link>
                </div>
            </div>
        </article>
    );
}
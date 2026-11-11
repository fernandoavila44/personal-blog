
import Link from 'next/link';
import styles from './BlogCard.module.scss';

interface BlogCardProps {
    title: string;
    excerpt: string;
    slug: string;
    date: string;
    category: string;
    readTime: string;
}

export default function BlogCard({
    title,
    excerpt,
    slug,
    date,
    category,
    readTime,
}: BlogCardProps) {
    const formattedDate = new Date(`${date}T12:00:00`).toLocaleDateString(
        'es-CO',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
    );

    return (
        <article className={styles.card}>
            <div className={styles.cardVisual}>
                <span className={styles.visualLabel}>SANTIDEV</span>
                <span className={styles.visualSymbol} aria-hidden="true">
                    {'</>'}
                </span>
                <span className={styles.visualDecoration} aria-hidden="true">
                    ✦
                </span>
            </div>

            <div className={styles.cardContent}>
                <div className={styles.header}>
                    <span className={styles.category}>
                        {category}
                    </span>

                    <span className={styles.readTime}>
                        <span aria-hidden="true">◷</span>
                        {readTime}
                    </span>
                </div>

                <h3 className={styles.title}>
                    <Link href={`/blog/${slug}`}>
                        {title}
                    </Link>
                </h3>

                <p className={styles.excerpt}>
                    {excerpt}
                </p>

                <div className={styles.footer}>
                    <time
                        className={styles.date}
                        dateTime={date}
                    >
                        {formattedDate}
                    </time>

                    <Link
                        href={`/blog/${slug}`}
                        className={styles.readMore}
                        aria-label={`Leer artículo: ${title}`}
                    >
                        Leer artículo
                        <span aria-hidden="true"> →</span>
                    </Link>
                </div>
            </div>
        </article>
    );
}

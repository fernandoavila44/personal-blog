import Image from 'next/image';
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
    image?: string;
    tags?: string[];
    variant?: 'default' | 'featured' | 'compact';
}

export default function BlogCard({
    title,
    excerpt,
    slug,
    date,
    category,
    readTime,
    author,
    image,
    tags,
    variant = 'default',
}: BlogCardProps) {
    // Combina la clase base con la de la variante (si no es "default")
    const cardClass = variant === 'default' ? styles.card : `${styles.card} ${styles[variant]}`;

    return (
        <article className={cardClass}>
            {image && (
                <div className={styles.imageWrapper}>
                    <Image
                        src={image}
                        alt={title}
                        width={400}
                        height={200}
                        className={styles.image}
                    />
                </div>
            )}

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

            {tags && tags.length > 0 && (
                <div className={styles.tags}>
                    {tags.map((tag) => (
                        <span key={tag} className={styles.tag}>#{tag}</span>
                    ))}
                </div>
            )}

            <div className={styles.footer}>
                <div>
                    {author && <span className={styles.author}>Por {author} · </span>}
                    <time className={styles.date}>{new Date(date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</time>
                </div>

                <Link href={`/blog/${slug}`} className={styles.readMore}>
                    Leer más →
                </Link>
            </div>
        </article>
    );
}
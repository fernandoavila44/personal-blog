import Link from 'next/link';
import Image from 'next/image';
import styles from './BlogCard.module.scss';

interface BlogCardProps {
    title: string;
    excerpt: string;
    slug: string;
    date: string;
    category: string;
    readTime: string;
    image?: string;
    author?: string;
    tags?: string[];
    isFeatured?: boolean;
    isCompact?: boolean;
}

export default function BlogCard({ 
    title, 
    excerpt, 
    slug, 
    date, 
    category, 
    readTime,
    image,
    author,
    tags,
    isFeatured,
    isCompact
}: BlogCardProps) {
    
    // Determinar la clase principal basada en los props (variantes)
    let cardClass = styles.card;
    if (isFeatured) cardClass = `${styles.card} ${styles.cardFeatured}`;
    if (isCompact) cardClass = `${styles.card} ${styles.cardCompact}`;

    return (
        <article className={cardClass}>
            {image && (
                <div className={styles.imageContainer}>
                    <Image 
                        src={image} 
                        alt={`Imagen para ${title}`} 
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            )}

            <div className={styles.content}>
                <div className={styles.header}>
                    <span className={styles.category}>{category}</span>
                    <span className={styles.readTime}>⏳ {readTime}</span>
                </div>

                <h3 className={styles.title}>
                    <Link href={`/blog/${slug}`}>
                        {title}
                    </Link>
                </h3>

                {tags && tags.length > 0 && (
                    <div className={styles.tags}>
                        {tags.map((tag) => (
                            <span key={tag} className={styles.tag}>#{tag}</span>
                        ))}
                    </div>
                )}

                <p className={styles.excerpt}>{excerpt}</p>

                <div className={styles.footer}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <time className={styles.date}>
                            {new Date(date).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </time>
                        {author && <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>• {author}</span>}
                    </div>

                    <Link href={`/blog/${slug}`} className={styles.readMore}>
                        Leer más →
                    </Link>
                </div>
            </div>
        </article>
    );
}

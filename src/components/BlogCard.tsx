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
    author?: string;
    imageUrl?: string;
}

export default function BlogCard({
    title,
    excerpt,
    slug,
    date,
    category,
    readTime,
    author,
    imageUrl
}: BlogCardProps) {

    const formattedDate = new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <article className={styles.card}>

            {/* Imagen */}
            {imageUrl && (
                <Link href={`/blog/${slug}`} className={styles.imageContainer}>
                    <Image
                        src={imageUrl}
                        alt={title}
                        width={600}
                        height={400}
                        className={styles.image}
                        priority={false}
                    />
                </Link>
            )}

            {/* Header */}
            <div className={styles.header}>
                <span className={styles.category}>{category}</span>
                <span className={styles.readTime}>{readTime}</span>
            </div>

            {/* Title */}
            <h3 className={styles.title}>
                <Link href={`/blog/${slug}`}>
                    {title}
                </Link>
            </h3>

            {/* Excerpt */}
            <p className={styles.excerpt}>{excerpt}</p>

            {/* Footer */}
            <div className={styles.footer}>

                <div className={styles.meta}>
                    <time className={styles.date}>
                        {formattedDate}
                    </time>

                    {author && (
                        <span className={styles.author}>
                            por {author}
                        </span>
                    )}
                </div>

                <Link
                    href={`/blog/${slug}`}
                    className={styles.readMore}
                >
                    Leer más →
                </Link>

            </div>

        </article>
    );
}


/* TODO para estudiantes:
 * 1. Agregar una imagen al card (usar next/image)
 * 2. Agregar prop para el autor
 * 3. Mejorar la animación hover
 * 4. Agregar tags/etiquetas del post
 */

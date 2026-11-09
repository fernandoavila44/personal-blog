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
    author: string;
    image: string;
}

export default function BlogCard({
    title,
    excerpt,
    slug,
    date,
    category,
    readTime,
    author,
    image
}: BlogCardProps) {
    return (
        <article className={styles.card}>
            <Link href={`/blog/${slug}`} className={styles.imageLink}>
                <Image
                    src={image}
                    alt={title}
                    width={600}
                    height={340}
                    className={styles.image}
                />
            </Link>

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
                        <span className={styles.author}>{author}</span>

                        <time className={styles.date} dateTime={date}>
                            {new Date(date).toLocaleDateString('es-CO', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    </div>

                    <Link href={`/blog/${slug}`} className={styles.readMore}>
                        Leer más →
                    </Link>
                </div>
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

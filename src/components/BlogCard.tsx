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

// Ícono y color de portada según la categoría del post
const categoryCovers: Record<string, { icon: string; className: string }> = {
    Tutorial: { icon: '📘', className: styles.coverTutorial },
    Conceptos: { icon: '💡', className: styles.coverConceptos },
    React: { icon: '⚛️', className: styles.coverReact },
    Performance: { icon: '⚡', className: styles.coverPerformance },
};

const defaultCover = { icon: '📝', className: styles.coverDefault };

export default function BlogCard({ title, excerpt, slug, date, category, readTime, author }: BlogCardProps) {
    const cover = categoryCovers[category] ?? defaultCover;

    return (
        <article className={styles.card}>
            {/* Portada: recuadro de color con ícono según la categoría */}
            <Link
                href={`/blog/${slug}`}
                className={`${styles.cover} ${cover.className}`}
                aria-hidden="true"
                tabIndex={-1}
            >
                <span className={styles.coverIcon}>{cover.icon}</span>
            </Link>

            <div className={styles.body}>
                <div className={styles.header}>
                    <span className={styles.category}>{category}</span>
                    <span className={styles.readTime}>⏱️ {readTime}</span>
                </div>

                <h3 className={styles.title}>
                    <Link href={`/blog/${slug}`}>
                        {title}
                    </Link>
                </h3>

                <p className={styles.excerpt}>{excerpt}</p>

                <div className={styles.footer}>
                    <div className={styles.meta}>
                        {author && <span className={styles.author}>✍️ {author}</span>}
                        <time className={styles.date} dateTime={date}>
                            {new Date(date).toLocaleDateString('es-ES', {
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

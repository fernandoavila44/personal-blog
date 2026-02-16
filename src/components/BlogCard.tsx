import Link from 'next/link';
import styles from './BlogCard.module.scss';
import Image from 'next/image';


interface BlogCardProps {
    title: string;
    excerpt: string;
    slug: string;
    date: string;
    category: string;
    readTime: string;
    image: string;
}


export default function BlogCard({ title, excerpt, slug, date, category, readTime,image }: BlogCardProps) {
    return (
        <article className={styles.card}>

            {image && (
                <div className={styles.imageWrapper}>
                    <Link href={`/blog/${slug}`}>
                        <Image
                            src={image}
                            alt={title}
                            width={600}
                            height={300}
                            className={styles.image}
                        />
                    </Link>
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

            <div className={styles.footer}>
                <time className={styles.date}>{new Date(date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</time>

                <Link href={`/blog/${slug}`} className={styles.readMore}>
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

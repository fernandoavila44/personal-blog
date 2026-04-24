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
    tags?: string[];
    featured?: boolean;
    imageUrl?: string;
}

export default function BlogCard({ 
    title, 
    excerpt, 
    slug, 
    date, 
    category, 
    readTime, 
    author = 'Fernando Ávila', 
    tags = ['Web', 'Tips'],
    featured = false,
    imageUrl = '/images/blog_placeholder.png'
}: BlogCardProps) {
    return (
        <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
            <div className={styles.imageContainer}>
                <Image 
                    src={imageUrl} 
                    alt={title} 
                    fill
                    className={styles.postImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

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

                {/* Etiquetas añadidas */}
                <div className={styles.tags}>
                    {tags.map(tag => (
                        <span key={tag} className={styles.tag}>#{tag}</span>
                    ))}
                </div>

                <div className={styles.footer}>
                    <div>
                        <time className={styles.date}>{new Date(date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}</time>
                        <span style={{color: 'gray', fontSize: '0.8rem', marginLeft: '10px'}}>por {author}</span>
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

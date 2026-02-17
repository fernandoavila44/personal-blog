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
    image: string;
    author: string;
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
}: BlogCardProps) {
    return (
        <article className={styles.card}>
            <Link href={`/blog/${slug}`} className={styles.imageWrapper}>
                <Image
                    src={image}
                    alt={title}
                    width={400}
                    height={250}
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
                    <div className={styles.meta}>
                        <span>{author}</span>
                        <span>•</span>
                        <time>
                            {new Date(date).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
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

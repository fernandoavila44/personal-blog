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
  tags?: string[];    
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
  tags = []
}: BlogCardProps) {
  return (
    <article className={styles.card}>
      
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          width={400}
          height={200}
          className={styles.image}
        />
      </div>

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

      
      <div className={styles.author}>Por {author}</div>

      
      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <time className={styles.date}>
          {new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>

        <Link href={`/blog/${slug}`} className={styles.readMore}>
          Leer más →
        </Link>
      </div>
    </article>
  );
}

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
  image?: string;
  author?: string;
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
  tags = [],
}: BlogCardProps) {
  return (
    <article className={styles.card}>
      {image && (
        <Link href={`/blog/${slug}`}>
          <Image
            src={image}
            alt={`Portada de ${title}`}
            width={1200}
            height={675}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{
              width: '100%',
              height: 'auto',
              aspectRatio: '16 / 9',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '1rem',
              display: 'block',
            }}
          />
        </Link>
      )}

      <div className={styles.header}>
        <span className={styles.category}>{category}</span>
        <span className={styles.readTime}>{readTime}</span>
      </div>

      <h3 className={styles.title}>
        <Link href={`/blog/${slug}`}>{title}</Link>
      </h3>

      <p className={styles.excerpt}>{excerpt}</p>

      {author && (
        <p
          style={{
            marginBottom: '1rem',
            color: 'var(--muted-text)',
            fontSize: '0.9rem',
          }}
        >
          Por {author}
        </p>
      )}

      {tags.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '0.25rem 0.6rem',
                borderRadius: '6px',
                backgroundColor: 'var(--page-background)',
                color: 'var(--link-color)',
                border: '1px solid var(--border-color)',
                fontSize: '0.8rem',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <time className={styles.date} dateTime={date}>
          {new Date(date).toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC',
          })}
        </time>

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

import Link from "next/link";
import Image from "next/image";
import styles from "./BlogCard.module.scss";

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  author: string;
  tags: string[];
  variant?: "default" | "featured" | "compact";
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
  variant = "default",
}: BlogCardProps) {
  return (
    <article className={`${styles.card} ${styles[variant]}`}>
      <Link
        href={`/blog/${slug}`}
        className={styles.imageContainer}
        aria-label={`Leer ${title}`}
      >
        <Image
          src={image}
          alt={`Portada del artículo: ${title}`}
          width={800}
          height={450}
          className={styles.coverImage}
        />
      </Link>

      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.category}>{category}</span>
          <span className={styles.readTime}>{readTime}</span>
        </div>

        <h3 className={styles.title}>
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h3>

        <p className={styles.excerpt}>{excerpt}</p>

        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.author}>
            <Image
              src="/images/avatar.png"
              alt={author}
              width={32}
              height={32}
              className={styles.avatar}
            />
            <span>{author}</span>
          </div>

          <time className={styles.date} dateTime={date}>
            {new Date(date).toLocaleDateString("es-CO", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        <Link href={`/blog/${slug}`} className={styles.readMore}>
          Leer más →
        </Link>
      </div>
    </article>
  );
}

import { notFound } from 'next/navigation';
import postsData from '@/data/posts.json';
import styles from './page.module.scss';
import CommentSection from '@/components/CommentSection';


export async function generateStaticParams() {
  return postsData.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  
  const post = postsData.find((p) => p.slug === params.slug);

  
  if (!post) {
    notFound();
  }

  return (
    <article className={styles.postPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.meta}>
          <time>{new Date(post.date).toLocaleDateString('es-ES')}</time>
          <span>{post.category}</span>
          <span>{post.readTime}</span>
          <span>{post.author}</span>
        </div>
      </header>

      <div className={styles.content}>
        <p>{post.content}</p>
      </div>

      <div className={styles.backButton}>
        <a href="/blog">← Volver al blog</a>
      </div>

      
      <CommentSection />
    </article>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import postsData from "@/data/posts.json";
import CommentSection from "@/components/CommentSection";
import styles from "./page.module.scss";

export function generateStaticParams() {
  return postsData.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = postsData.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className={styles.postPage}>
      <div className="container">
        <Link href="/blog" className={styles.backLink}>
          ← Volver al blog
        </Link>

        <header className={styles.header}>
          <span className={styles.category}>{post.category}</span>

          <h1>{post.title}</h1>

          <div className={styles.metadata}>
            <span>{post.author}</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString()}
            </time>
            <span>{post.readTime} de lectura</span>
          </div>
        </header>

        <div className={styles.content}>
          <p>{post.content}</p>
        </div>

        <CommentSection />
      </div>
    </article>
  );
}

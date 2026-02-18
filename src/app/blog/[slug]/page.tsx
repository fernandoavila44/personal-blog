'use client';

import { useState, useMemo } from 'react';
import BlogCard from '@/components/BlogCard';
import postsData from '@/data/posts.json';
import styles from './page.module.scss';

const POSTS_PER_PAGE = 6;

type Post = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  category: string;
  readTime: string;
  image?: string;
  author?: string;
  tags?: string[];
};

export default function BlogPage() {
  const [category, setCategory] = useState('Todos');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
    const unique = new Set(postsData.map((p: Post) => p.category));
    return ['Todos', ...Array.from(unique)];
  }, []);

  const filteredPosts = useMemo(() => {
    return postsData.filter((post: Post) => {
      const matchCategory =
        category === 'Todos' || post.category === category;

      const matchSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [category, search]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const start = (page - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, page]);

  return (
    <div className={styles.blogPage}>
      <div className="container">
        <header className={styles.header}>
          <h1>Blog</h1>
          <p>Artículos sobre desarrollo web, Next.js, React y más</p>
        </header>

        <input
          type="text"
          placeholder="Buscar posts..."
          className={styles.search}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${
                cat === category ? styles.active : ''
              }`}
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.postsGrid}>
          {paginatedPosts.length > 0 ? (
            paginatedPosts.map((post: Post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                slug={post.slug}
                date={post.date}
                category={post.category}
                readTime={post.readTime}
                image={post.image ?? '/placeholder.jpg'}
                author={post.author ?? 'Admin'}
                tags={post.tags ?? []}
              />
            ))
          ) : (
            <p>No se encontraron resultados.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              ← Anterior
            </button>

            <span>
              Página {page} de {totalPages}
            </span>

            <button
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Siguiente →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

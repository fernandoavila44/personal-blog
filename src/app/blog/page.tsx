'use client';

import { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import postsData from '@/data/posts.json';
import styles from './page.module.scss';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [category, setCategory] = useState<string>('Todos');
  const [page, setPage] = useState(1);

  // Categorías únicas
  const categories = ['Todos', ...new Set(postsData.map(p => p.category))];

  // Filtrado
  const filteredPosts =
    category === 'Todos'
      ? postsData
      : postsData.filter(post => post.category === category);

  // Paginación
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(start, start + POSTS_PER_PAGE);

  return (
    <div className={styles.blogPage}>
      <div className="container">
        <header className={styles.header}>
          <h1>Blog</h1>
          <p>Artículos sobre desarrollo web, Next.js, React y más</p>
        </header>

        {/* FILTROS */}
        <div className={styles.filters}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
              className={category === cat ? styles.active : ''}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* POSTS */}
        <div className={styles.postsGrid}>
          {currentPosts.length > 0 ? (
            currentPosts.map(post => (
            <BlogCard
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug}
              date={post.date}
              category={post.category}
              readTime={post.readTime}
              image={
                typeof post.image === 'string' && post.image.trim() !== ''
                  ? post.image
                  : '/placeholder.jpg'
              }
              author={post.author || 'Admin'}
              tags={post.tags || []}
            />

            ))
          ) : (
            <p>No hay posts en esta categoría.</p>
          )}
        </div>

        {/* PAGINACIÓN */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(p - 1, 1))}
            >
              ← Anterior
            </button>

            <span>Página {page} de {totalPages}</span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            >
              Siguiente →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

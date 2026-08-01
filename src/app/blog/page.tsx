'use client';

import { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import postsData from '@/data/posts.json';
import styles from './page.module.scss';

export default function BlogPage() {
  
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  
  const filteredPosts =
    selectedCategory === 'Todos'
      ? postsData
      : postsData.filter((post) => post.category === selectedCategory);

  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className={styles.blogPage}>
      <div className="container">
        <header className={styles.header}>
          <h1>Blog</h1>
          <p>Artículos sobre desarrollo web, Next.js, React y más</p>
        </header>

        
        <div className={styles.filters}>
          {['Todos', 'Tutorial', 'Conceptos', 'React'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1); 
              }}
              className={
                selectedCategory === cat ? styles.activeFilter : undefined
              }
            >
              {cat}
            </button>
          ))}
        </div>

        
        <div className={styles.postsGrid}>
  {currentPosts.map((post) => (
    <BlogCard
      key={post.id}
      title={post.title}
      excerpt={post.excerpt}
      slug={post.slug}
      date={post.date}
      category={post.category}
      readTime={post.readTime}
      image={post.image}       
      author={post.author}     
      tags={post.tags}         
    />
  ))}
</div>

        
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            ← Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}

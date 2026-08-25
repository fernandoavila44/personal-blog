'use client';

import { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import postsData from '@/data/posts.json';
import styles from './page.module.scss';

const categories = ['Todos', ...Array.from(new Set(postsData.map((post) => post.category)))];
const postsPerPage = 3;

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredPosts =
        selectedCategory === 'Todos'
            ? postsData
            : postsData.filter((post) => post.category === selectedCategory);

    const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    return (
        <div className={styles.blogPage}>
            <div className="container">
                <header className={styles.header}>
                    <h1>Blog</h1>
                    <p>Artículos sobre desarrollo web, Next.js, React y más</p>
                </header>

                <div className={styles.filters}>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''}`}
                        >
                            {category}
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
                        />
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <p className={styles.empty}>No hay posts en esta categoría.</p>
                )}

                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button
                            onClick={() => setCurrentPage((page) => page - 1)}
                            disabled={currentPage === 1}
                        >
                            ← Anterior
                        </button>
                        <span>
                            Página {currentPage} de {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((page) => page + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Siguiente →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

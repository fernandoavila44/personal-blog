'use client';

import { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import postsData from '@/data/posts.json';
import styles from './page.module.scss';

const POSTS_PER_PAGE = 6;

// Categorías únicas sacadas de los posts, con "Todos" al inicio
const categories = ['Todos', ...Array.from(new Set(postsData.map((post) => post.category)))];

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
    const [currentPage, setCurrentPage] = useState(1);

    // Filtrado por categoría
    const filteredPosts =
        selectedCategory === 'Todos'
            ? postsData
            : postsData.filter((post) => post.category === selectedCategory);

    // Paginación
    const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    // Al cambiar de categoría volvemos a la página 1
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
                            style={{
                                fontWeight: category === selectedCategory ? 'bold' : 'normal',
                                textDecoration: category === selectedCategory ? 'underline' : 'none',
                            }}
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
                            author={post.author}
                            image={post.image}
                        />
                    ))}
                </div>

                <div className={styles.pagination}>
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        ← Anterior
                    </button>
                    <span>
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Siguiente →
                    </button>
                </div>
            </div>
        </div>
    );
}
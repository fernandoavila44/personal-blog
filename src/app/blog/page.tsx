'use client';

import { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import postsData from '@/data/posts.json';
import styles from './page.module.scss';

export default function BlogPage() {
    // Filtrado por categoría
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

    const filteredPosts = selectedCategory === 'Todos'
        ? postsData
        : postsData.filter(post => post.category === selectedCategory);

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    // Al cambiar de categoría se vuelve a la página 1
    const changeCategory = (category: string) => {
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
                    <button
                        onClick={() => changeCategory('Todos')}
                        className={selectedCategory === 'Todos' ? styles.active : ''}
                    >
                        Todos
                    </button>
                    <button
                        onClick={() => changeCategory('Tutorial')}
                        className={selectedCategory === 'Tutorial' ? styles.active : ''}
                    >
                        Tutorial
                    </button>
                    <button
                        onClick={() => changeCategory('Conceptos')}
                        className={selectedCategory === 'Conceptos' ? styles.active : ''}
                    >
                        Conceptos
                    </button>
                    <button
                        onClick={() => changeCategory('React')}
                        className={selectedCategory === 'React' ? styles.active : ''}
                    >
                        React
                    </button>
                    <button
                        onClick={() => changeCategory('Performance')}
                        className={selectedCategory === 'Performance' ? styles.active : ''}
                    >
                        Performance
                    </button>
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

                <div className={styles.pagination}>
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        ← Anterior
                    </button>
                    <span>Página {currentPage} de {totalPages}</span>
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
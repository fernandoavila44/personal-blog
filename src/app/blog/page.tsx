
'use client';

import { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import postsData from '@/data/posts.json';
import styles from './page.module.scss';

const POSTS_PER_PAGE = 6;

const categories = [
    'Todas',
    ...Array.from(new Set(postsData.map((post) => post.category))),
];

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Filtrar publicaciones por categoría y búsqueda
    const filteredPosts = postsData.filter((post) => {
        const matchesCategory =
            selectedCategory === 'Todas' ||
            post.category === selectedCategory;

        const search = searchTerm.toLowerCase().trim();

        const matchesSearch =
            post.title.toLowerCase().includes(search) ||
            post.excerpt.toLowerCase().includes(search) ||
            post.category.toLowerCase().includes(search);

        return matchesCategory && matchesSearch;
    });

    // Calcular paginación
    const totalPages = Math.max(
        1,
        Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
    );

    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;

    const currentPosts = filteredPosts.slice(
        startIndex,
        startIndex + POSTS_PER_PAGE
    );

    // Cambiar categoría
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    // Cambiar búsqueda
    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    return (
        <main className={styles.blogPage}>
            <div className="container">

                <header className={styles.header}>
                    <span className={styles.eyebrow}>
                        SANTIDEV · PUBLICACIONES
                    </span>

                    <h1>
                        Explora el mundo de la <span>tecnología.</span>
                    </h1>

                    <p>
                        Artículos, tutoriales y experiencias sobre desarrollo
                        web, programación, React, Next.js y mucho más.
                    </p>
                </header>

                {/* Buscador */}
                <section className={styles.searchSection}>
                    <div className={styles.searchBox}>
                        <span className={styles.searchIcon}>⌕</span>

                        <input
                            type="search"
                            placeholder="Buscar artículos por título, tema o categoría..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            aria-label="Buscar publicaciones"
                        />

                        {searchTerm && (
                            <button
                                type="button"
                                className={styles.clearSearch}
                                onClick={() => handleSearch('')}
                                aria-label="Limpiar búsqueda"
                            >
                                ×
                            </button>
                        )}
                    </div>
                </section>

                {/* Filtros por categoría */}
                <section className={styles.filterSection}>
                    <div className={styles.filterHeader}>
                        <h2>Explorar por categoría</h2>

                        <span>
                            {filteredPosts.length}{' '}
                            {filteredPosts.length === 1
                                ? 'publicación'
                                : 'publicaciones'}
                        </span>
                    </div>

                    <div className={styles.filters}>
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                className={
                                    selectedCategory === category
                                        ? styles.activeFilter
                                        : styles.filterButton
                                }
                                onClick={() => handleCategoryChange(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Publicaciones */}
                {currentPosts.length > 0 ? (
                    <>
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

                        {/* Paginación */}
                        {totalPages > 1 && (
                            <nav
                                className={styles.pagination}
                                aria-label="Paginación de publicaciones"
                            >
                                <button
                                    type="button"
                                    className={styles.pageButton}
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage((page) => page - 1)
                                    }
                                >
                                    ← Anterior
                                </button>

                                <div className={styles.pageInfo}>
                                    <span>Página</span>

                                    <strong>{currentPage}</strong>

                                    <span>de {totalPages}</span>
                                </div>

                                <button
                                    type="button"
                                    className={styles.pageButton}
                                    disabled={currentPage === totalPages}
                                    onClick={() =>
                                        setCurrentPage((page) => page + 1)
                                    }
                                >
                                    Siguiente →
                                </button>
                            </nav>
                        )}
                    </>
                ) : (
                    <div className={styles.emptyState}>
                        <span className={styles.emptyIcon}>⌕</span>

                        <h2>No encontramos publicaciones</h2>

                        <p>
                            No hay artículos que coincidan con tu búsqueda
                            o categoría seleccionada.
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('Todas');
                                setCurrentPage(1);
                            }}
                        >
                            Ver todas las publicaciones
                        </button>
                    </div>
                )}

            </div>
        </main>
    );
}

'use client';

import { useState, useMemo } from 'react';
import BlogCard from '@/components/BlogCard';
import postsData from '@/data/posts.json';
import styles from './page.module.scss';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    // Obtener categorías únicas
    const categories = useMemo(() => {
        const uniqueCategories = new Set(postsData.map(post => post.category));
        return ['Todos', ...Array.from(uniqueCategories)];
    }, []);

    // Filtrar posts por categoría y búsqueda
    const filteredPosts = useMemo(() => {
        return postsData.filter(post => {
            const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    // Calcular paginación
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const currentPosts = filteredPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    // Manejadores de eventos
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Resetear a la primera página al cambiar filtro
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Resetear a la primera página al buscar
    };

    return (
        <div className={styles.blogPage}>
            <div className="container">
                <header className={styles.header}>
                    <h1>Blog</h1>
                    <p>Artículos sobre desarrollo web, Next.js, React y más</p>
                </header>

                <div className={styles.controls}>
                    <div className={styles.searchBar}>
                        <input 
                            type="text" 
                            placeholder="Buscar artículos..." 
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className={styles.filters}>
                        {categories.map(category => (
                            <button 
                                key={category}
                                className={selectedCategory === category ? styles.active : ''}
                                onClick={() => handleCategoryChange(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.postsGrid}>
                    {currentPosts.length > 0 ? (
                        currentPosts.map((post) => (
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
                            />
                        ))
                    ) : (
                        <div className={styles.noResults}>
                            <p>No se encontraron artículos que coincidan con tu búsqueda.</p>
                        </div>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button 
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        >
                            ← Anterior
                        </button>
                        <span>Página {currentPage} de {totalPages}</span>
                        <button 
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        >
                            Siguiente →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

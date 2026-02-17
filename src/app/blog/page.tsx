'use client';

import { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import postsData from '@/data/posts.json';
import styles from './page.module.scss';

interface Post {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    date: string;
    category: string;
    readTime: string;
    content?: string;
    author?: string;
}

export default function BlogPage() {
    // Obtener categorías únicas
    const categories = [
        'Todos',
        ...Array.from(new Set((postsData as Post[]).map((post) => post.category)))
    ];
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    // Paginación
    const POSTS_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);

    // Filtrar posts por categoría
    const filteredPosts = selectedCategory === 'Todos'
        ? (postsData as Post[])
        : (postsData as Post[]).filter((post) => post.category === selectedCategory);

    // Calcular paginación
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    // Cambiar página
    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    // Cambiar categoría
    const handleCategory = (cat: string) => {
        setSelectedCategory(cat);
        setCurrentPage(1);
    };

    return (
        <div className={styles.blogPage}>
            <div className="container">
                <header className={styles.header}>
                    <h1>Blog</h1>
                    <p>Artículos sobre desarrollo web, Next.js, React y más</p>
                </header>

                {/* Filtros por categoría */}
                <div className={styles.filters}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={cat === selectedCategory ? styles.active : ''}
                            onClick={() => handleCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className={styles.postsGrid}>
                    {paginatedPosts.map((post) => (
                        <BlogCard
                            key={post.id}
                            title={post.title}
                            excerpt={post.excerpt}
                            slug={post.slug}
                            date={post.date}
                            category={post.category}
                            readTime={post.readTime}
                            author={post.author}
                        />
                    ))}
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>
                            ← Anterior
                        </button>
                        <span>Página {currentPage} de {totalPages}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            Siguiente →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

/* EJERCICIO para estudiantes:
 * 
 * 1. FILTRADO POR CATEGORÍA (Client Component)
 *    - Convertir este componente a Client Component ('use client')
 *    - Usar useState para manejar la categoría seleccionada
 *    - Filtrar postsData basándose en la categoría
 *    - Agregar botones de filtro con estilos activos
 * 
 * 2. PAGINACIÓN
 *    - Implementar lógica de paginación (6 posts por página)
 *    - Usar useState para el número de página actual
 *    - Calcular el total de páginas
 *    - Mostrar solo los posts de la página actual
 * 
 * 3. BÚSQUEDA (Opcional - Avanzado)
 *    - Agregar un input de búsqueda
 *    - Filtrar posts por título o excerpt
 *    - Combinar búsqueda con filtros de categoría
 */

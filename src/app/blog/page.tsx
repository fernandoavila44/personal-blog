'use client';

import { useState, useMemo } from 'react';
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

    const posts = postsData as Post[];

    // ESTADOS

    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    const POSTS_PER_PAGE = 6;

    // CATEGORÍAS

    const categories = useMemo(() => {
        return [
            'Todos',
            ...Array.from(new Set(posts.map(post => post.category)))
        ];
    }, [posts]);

    // FILTRO + BÚSQUEDA

    const filteredPosts = useMemo(() => {

        let filtered = posts;

        // filtro por categoría
        if (selectedCategory !== 'Todos') {
            filtered = filtered.filter(
                post => post.category === selectedCategory
            );
        }

        // filtro por búsqueda
        if (search.trim() !== '') {
            const term = search.toLowerCase();

            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(term) ||
                post.excerpt.toLowerCase().includes(term)
            );
        }

        return filtered;

    }, [posts, selectedCategory, search]);

    // PAGINACIÓN

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

    const paginatedPosts = useMemo(() => {
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        const end = start + POSTS_PER_PAGE;

        return filteredPosts.slice(start, end);
    }, [filteredPosts, currentPage]);

    // EVENTOS

    const handleCategory = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    // RENDER

    return (
        <div className={styles.blogPage}>

            <div className="container">

                <header className={styles.header}>
                    <h1>Blog</h1>
                    <p>Artículos sobre desarrollo web, Next.js, React y más</p>
                </header>

                {/* BUSCADOR */}
                <div className={styles.search}>
                    <input
                        type="text"
                        placeholder="Buscar artículos..."
                        value={search}
                        onChange={handleSearch}
                    />
                </div>

                {/* CATEGORÍAS */}
                <div className={styles.filters}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => handleCategory(cat)}
                            className={
                                cat === selectedCategory
                                    ? styles.active
                                    : ''
                            }
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* POSTS */}
                <div className={styles.postsGrid}>
                    {paginatedPosts.map(post => (
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

                {/* PAGINACIÓN */}
                {totalPages > 1 && (
                    <div className={styles.pagination}>

                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            ← Anterior
                        </button>

                        <span>
                            Página {currentPage} de {totalPages}
                        </span>

                        <button
                            onClick={handleNextPage}
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

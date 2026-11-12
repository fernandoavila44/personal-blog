'use client';

import { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import postsData from '@/data/posts.json';
import styles from './page.module.scss';

const POSTS_PER_PAGE = 6;

// Categorías obtenidas de los posts (sin repetir)
const categories = ['Todos', ...Array.from(new Set(postsData.map((post) => post.category)))];

export default function BlogPage() {
    // Filtrado por categoría
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

    // Búsqueda por título o excerpt (opcional)
    const [searchTerm, setSearchTerm] = useState('');

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);

    // 1. Filtrar por categoría
    const postsByCategory =
        selectedCategory === 'Todos'
            ? postsData
            : postsData.filter((post) => post.category === selectedCategory);

    // 2. Filtrar por búsqueda (se combina con la categoría)
    const term = searchTerm.trim().toLowerCase();
    const filteredPosts = term
        ? postsByCategory.filter(
              (post) =>
                  post.title.toLowerCase().includes(term) ||
                  post.excerpt.toLowerCase().includes(term)
          )
        : postsByCategory;

    // 3. Paginar el resultado
    const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    // Al cambiar el filtro o la búsqueda se vuelve a la primera página
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const countByCategory = (category: string) =>
        category === 'Todos'
            ? postsData.length
            : postsData.filter((post) => post.category === category).length;

    return (
        <div className={styles.blogPage}>
            <div className="container">
                <header className={styles.header}>
                    <h1>Blog</h1>
                    <p>Artículos sobre desarrollo web, Next.js, React y más</p>
                </header>

                {/* Búsqueda */}
                <div className={styles.search}>
                    <input
                        type="search"
                        placeholder="🔍 Buscar por título o descripción..."
                        aria-label="Buscar posts"
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                </div>

                {/* Filtros por categoría */}
                <div className={styles.filters} role="group" aria-label="Filtrar por categoría">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            className={`${styles.filterButton} ${
                                selectedCategory === category ? styles.active : ''
                            }`}
                            onClick={() => handleCategoryChange(category)}
                            aria-pressed={selectedCategory === category}
                        >
                            {category}
                            <span className={styles.filterCount}>{countByCategory(category)}</span>
                        </button>
                    ))}
                </div>

                <p className={styles.results}>
                    Mostrando {currentPosts.length} de {filteredPosts.length} posts
                </p>

                {currentPosts.length > 0 ? (
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
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.empty}>
                        <p>No se encontraron posts que coincidan con tu búsqueda.</p>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                handleCategoryChange('Todos');
                                setSearchTerm('');
                            }}
                        >
                            Ver todos los posts
                        </button>
                    </div>
                )}

                {/* Paginación */}
                {filteredPosts.length > 0 && (
                    <nav className={styles.pagination} aria-label="Paginación">
                        <button
                            type="button"
                            className={styles.pageButton}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            ← Anterior
                        </button>

                        <div className={styles.pageNumbers}>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    type="button"
                                    className={`${styles.pageNumber} ${
                                        currentPage === page ? styles.active : ''
                                    }`}
                                    onClick={() => setCurrentPage(page)}
                                    aria-current={currentPage === page ? 'page' : undefined}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <span className={styles.pageInfo}>
                            Página {currentPage} de {totalPages}
                        </span>

                        <button
                            type="button"
                            className={styles.pageButton}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Siguiente →
                        </button>
                    </nav>
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

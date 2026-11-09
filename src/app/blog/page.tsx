
'use client';

import { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import postsData from '@/data/posts.json';
import styles from './page.module.scss';

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [currentPage, setCurrentPage] = useState(1);

    const postsPerPage = 6;

    // Obtener las categorías disponibles
    const categories = [
        'Todos',
        ...new Set(postsData.map((post) => post.category))
    ];

    // Filtrar publicaciones por categoría
    const filteredPosts = selectedCategory === 'Todos'
        ? postsData
        : postsData.filter((post) => post.category === selectedCategory);

    // Calcular la cantidad de páginas
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    // Obtener publicaciones de la página actual
    const startIndex = (currentPage - 1) * postsPerPage;
    const currentPosts = filteredPosts.slice(
        startIndex,
        startIndex + postsPerPage
    );

    // Cambiar categoría y volver a la primera página
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

                {/* Filtros por categoría */}
                <div className={styles.filters}>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={
                                selectedCategory === category
                                    ? styles.activeFilter
                                    : styles.filterButton
                            }
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Publicaciones */}
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

                {/* Paginación */}
                {totalPages > 1 && (
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

'use client';

import { useState, useMemo } from 'react';
import BlogCard from '@/components/BlogCard';
import postsData from '@/data/posts.json';
import styles from './page.module.scss';

export default function BlogPage() {
    // TODO para estudiantes: Implementar filtrado por categoría
    // Pista: Usar useState para manejar la categoría seleccionada
    // y filtrar los posts basándose en esa categoría
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
    
    // BONUS: Búsqueda
    const [searchQuery, setSearchQuery] = useState('');

    // TODO para estudiantes: Implementar paginación
    // Pista: Mostrar solo 6 posts por página y agregar botones de navegación
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    // Obtener categorías únicas dinámicamente de los posts
    const categories = ['Todos', ...Array.from(new Set(postsData.map(post => post.category)))];

    // Filtrar posts
    const filteredPosts = useMemo(() => {
        let result = postsData;
        
        // Filtrar por categoría
        if (selectedCategory !== 'Todos') {
            result = result.filter(post => post.category === selectedCategory);
        }
        
        // Filtrar por búsqueda
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                post => post.title.toLowerCase().includes(query) || 
                        post.excerpt.toLowerCase().includes(query)
            );
        }
        
        return result;
    }, [selectedCategory, searchQuery]);

    // Calcular paginación matemática
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

    // Cambiar de categoría resetea la página actual a 1
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    // Cambiar búsqueda resetea la página actual a 1
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className={styles.blogPage}>
            <div className="container">
                <header className={styles.header}>
                    <h1>Blog</h1>
                    <p>Artículos sobre desarrollo web, Next.js, React y más</p>
                </header>

                <div className={styles.controlsContainer}>
                    {/* Búsqueda */}
                    <input 
                        type="text" 
                        placeholder="Buscar artículos..." 
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className={styles.searchBar}
                    />

                    {/* TODO para estudiantes: Agregar filtros por categoría aquí */}
                    <div className={styles.filters}>
                        {categories.map(category => (
                            <button 
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={selectedCategory === category ? styles.active : ''}
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
                            />
                        ))
                    ) : (
                        <div className={styles.noResults}>
                            No se encontraron artículos que coincidan con tu búsqueda.
                        </div>
                    )}
                </div>

                {/* TODO para estudiantes: Agregar paginación aquí */}
                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            &larr; Anterior
                        </button>
                        <span>Página {currentPage} de {totalPages}</span>
                        <button 
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Siguiente &rarr;
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

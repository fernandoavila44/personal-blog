'use client';

import BlogCard from '@/components/BlogCard';
import postsData from '@/data/posts.json';
import styles from './page.module.scss';
import { useMemo, useState } from 'react';


export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const postsPerPage = 6;

// Filtrado por categoría
const filteredPosts = useMemo(() => {
  if (selectedCategory === 'Todos') return postsData;
  return postsData.filter((post) => post.category === selectedCategory);
}, [selectedCategory]);

// Paginación (sobre los filtrados)
const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));

const currentPosts = useMemo(() => {
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  return filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
}, [filteredPosts, currentPage]);

// Si cambias categoría, vuelve a página 1
const handleCategoryChange = (category: string) => {
  setSelectedCategory(category);
  setCurrentPage(1);
};


    // TODO para estudiantes: Implementar filtrado por categoría
    <div className={styles.filters}>
    <button
        onClick={() => handleCategoryChange('Todos')}
        className={selectedCategory === 'Todos' ? styles.active : ''}
    >
        Todos
    </button>

    <button
        onClick={() => handleCategoryChange('Tutorial')}
        className={selectedCategory === 'Tutorial' ? styles.active : ''}
    >
        Tutorial
    </button>

    <button
        onClick={() => handleCategoryChange('Conceptos')}
        className={selectedCategory === 'Conceptos' ? styles.active : ''}
    >
        Conceptos
    </button>

    <button
        onClick={() => handleCategoryChange('React')}
        className={selectedCategory === 'React' ? styles.active : ''}
    >
        React
    </button>
</div>

    // Pista: Usar useState para manejar la categoría seleccionada
    // y filtrar los posts basándose en esa categoría

    // TODO para estudiantes: Implementar paginación
    // Pista: Mostrar solo 6 posts por página y agregar botones de navegación

    return (
        <div className={styles.blogPage}>
            <div className="container">
                <header className={styles.header}>
                    <h1>Blog</h1>
                    <p>Artículos sobre desarrollo web, Next.js, React y más</p>
                </header>

                {/* TODO para estudiantes: Agregar filtros por categoría aquí */}
                {/* Ejemplo de estructura:
        <div className={styles.filters}>
          <button>Todos</button>
          <button>Tutorial</button>
          <button>Conceptos</button>
          <button>React</button>
        </div>
        */}

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

                {/* TODO para estudiantes: Agregar paginación aquí */}
                <div className={styles.pagination}>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    ← Anterior
                  </button>

                  <span>
                    Página {currentPage} de {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Siguiente →
                  </button>
                </div>

                {/* Ejemplo de estructura:
        <div className={styles.pagination}>
          <button>← Anterior</button>
          <span>Página 1 de 2</span>
          <button>Siguiente →</button>
        </div>
        */}
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

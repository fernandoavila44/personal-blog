'use client';

import { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import postsData from '@/data/posts.json';
import styles from './page.module.scss';

const categories = [
  'Todos',
  ...new Set(postsData.map((post) => post.category)),
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);
const postsPerPage = 6;

  const filteredPosts =
    selectedCategory === 'Todos'
      ? postsData
      : postsData.filter((post) => post.category === selectedCategory);
const totalPages = Math.max(
  1,
  Math.ceil(filteredPosts.length / postsPerPage)
);

const startIndex = (currentPage - 1) * postsPerPage;

const currentPosts = filteredPosts.slice(
  startIndex,
  startIndex + postsPerPage
);
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
              type="button"
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        <p>
          {filteredPosts.length}{' '}
          {filteredPosts.length === 1 ? 'publicación' : 'publicaciones'}
        </p>

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
            image={post.image}
            author={post.author}
            tags={post.tags}
          />
          ))}
        </div>

        <nav className={styles.pagination} aria-label="Páginas del blog">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
          >
            ← Anterior
          </button>

          <span>
            Página {currentPage} de {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
          >
            Siguiente →
          </button>
        </nav>
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

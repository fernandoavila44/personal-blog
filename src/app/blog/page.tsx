'use client';

import { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import postsData from '@/data/posts.json';
import styles from './page.module.scss';

export default function BlogPage() {

    // TODO para estudiantes: Implementar filtrado por categoría
    // Pista: Usar useState para manejar la categoría seleccionada
    // y filtrar los posts basándose en esa categoría
    const [categoria, setCategoria] = useState('Todos');

    const categorias = ['Todos', ...new Set(postsData.map(post => post.category))];

    const postsFiltrados =
        categoria === 'Todos'
            ? postsData
            : postsData.filter(post => post.category === categoria);


    // TODO para estudiantes: Implementar paginación
    // Pista: Mostrar solo 6 posts por página y agregar botones de navegación
    const [paginaActual, setPaginaActual] = useState(1);
    const postsPorPagina = 6;

    const totalPaginas = Math.ceil(postsFiltrados.length / postsPorPagina);

    const indiceInicial = (paginaActual - 1) * postsPorPagina;
    const indiceFinal = indiceInicial + postsPorPagina;

    const postsMostrados = postsFiltrados.slice(indiceInicial, indiceFinal);

    return (
        <div className={styles.blogPage}>
            <div className="container">
                <header className={styles.header}>
                    <h1>Blog</h1>
                    <p>Artículos sobre desarrollo web, Next.js, React y más</p>
                </header>

                {/* TODO para estudiantes: Agregar filtros por categoría aquí */}
                <div className={styles.filters}>
                    {categorias.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setCategoria(cat);
                                setPaginaActual(1);
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className={styles.postsGrid}>
                    {postsMostrados.map((post) => (
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
                        onClick={() => setPaginaActual(paginaActual - 1)}
                        disabled={paginaActual === 1}
                    >
                        ← Anterior
                    </button>

                    <span>
                        Página {paginaActual} de {totalPaginas}
                    </span>

                    <button
                        onClick={() => setPaginaActual(paginaActual + 1)}
                        disabled={paginaActual === totalPaginas}
                    >
                        Siguiente →
                    </button>
                </div>
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

// import { useState } from 'react'
// import BlogCard from '@/components/BlogCard';
// import postsData from '@/data/posts.json';
// import styles from './page.module.scss';

// export default function BlogPage() {
//     // TODO para estudiantes: Implementar filtrado por categoría
//     // Pista: Usar useState para manejar la categoría seleccionada
//     // y filtrar los posts basándose en esa categoría

//     // TODO para estudiantes: Implementar paginación
//     // Pista: Mostrar solo 6 posts por página y agregar botones de navegación

//     return (
//         <div className={styles.blogPage}>
//             <div className="container">
//                 <header className={styles.header}>
//                     <h1>Blog</h1>
//                     <p>Artículos sobre desarrollo web, Next.js, React y más</p>
//                 </header>

//                 {/* TODO para estudiantes: Agregar filtros por categoría aquí */}
//                 {/* Ejemplo de estructura:
//         <div className={styles.filters}>
//           <button>Todos</button>
//           <button>Tutorial</button>
//           <button>Conceptos</button>
//           <button>React</button>
//         </div>
//         */}

//                 <div className={styles.postsGrid}>
//                     {postsData.map((post) => (
//                         <BlogCard
//                             key={post.id}
//                             title={post.title}
//                             excerpt={post.excerpt}
//                             slug={post.slug}
//                             date={post.date}
//                             category={post.category}
//                             readTime={post.readTime}
//                         />
//                     ))}
//                 </div>

//                 {/* TODO para estudiantes: Agregar paginación aquí */}
//                 {/* Ejemplo de estructura:
//         <div className={styles.pagination}>
//           <button>← Anterior</button>
//           <span>Página 1 de 2</span>
//           <button>Siguiente →</button>
//         </div>
//         */}
//             </div>
//         </div>
//     );
// }

'use client'

import { useState } from 'react'
import BlogCard from '@/components/BlogCard'
import postsData from '@/data/posts.json'
import styles from './page.module.scss'

export default function BlogPage() {

    //Estado para categoría
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos')

    //Estado para paginación
    const [currentPage, setCurrentPage] = useState<number>(1)

    const postsPerPage = 6

    //Filtrado
    const filteredPosts =
        selectedCategory === 'Todos'
            ? postsData
            : postsData.filter(post => post.category === selectedCategory)

    //Paginación
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

    return (
        <div className={styles.blogPage}>
            <div className="container">

                <header className={styles.header}>
                    <h1>Blog</h1>
                    <p>Artículos sobre desarrollo web, Next.js, React y más</p>
                </header>

                {/*FILTROS */}
                <div className={styles.filters}>
                    <button onClick={() => { setSelectedCategory('Todos'); setCurrentPage(1) }}>
                        Todos
                    </button>
                    <button onClick={() => { setSelectedCategory('Tutorial'); setCurrentPage(1) }}>
                        Tutorial
                    </button>
                    <button onClick={() => { setSelectedCategory('Conceptos'); setCurrentPage(1) }}>
                        Conceptos
                    </button>
                    <button onClick={() => { setSelectedCategory('React'); setCurrentPage(1) }}>
                        React
                    </button>
                    <button onClick={() => { setSelectedCategory('Performance'); setCurrentPage(1) }}>
                        Performance
                    </button>
                </div>

                {/*POSTS */}
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

                {/*PAGINACIÓN */}
                <div className={styles.pagination}>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        ← Anterior
                    </button>

                    <span>
                        Página {currentPage} de {totalPages}
                    </span>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Siguiente →
                    </button>
                </div>

            </div>
        </div>
    )
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

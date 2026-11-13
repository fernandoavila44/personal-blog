"use client";

import { useState } from "react";
import BlogCard from "@/components/BlogCard";
import postsData from "@/data/posts.json";
import styles from "./page.module.scss";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    "Todos",
    ...new Set(postsData.map((post) => post.category)),
  ];

  const filteredPosts =
    selectedCategory === "Todos"
      ? postsData
      : postsData.filter((post) => post.category === selectedCategory);

  const postsPerPage = 6;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / postsPerPage),
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

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

        <div className={styles.filters}>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                selectedCategory === category ? styles.activeFilter : ""
              }
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

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

        <div className={styles.pagination}>
          <button
            type="button"
            onClick={() => setCurrentPage((page) => page - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          <span>
            Página {currentPage} de {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

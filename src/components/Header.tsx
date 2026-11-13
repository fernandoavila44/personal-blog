"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import styles from "./Header.module.scss";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <h1>Mi Blog Personal</h1>
        </Link>

        <button
          type="button"
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav
          id="main-navigation"
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
        >
          <Link
            href="/"
            className={`${styles.navLink} ${isActive("/") ? styles.active : ""}`}
            aria-current={isActive("/") ? "page" : undefined}
            onClick={closeMenu}
          >
            Inicio
          </Link>

          <Link
            href="/blog"
            className={`${styles.navLink} ${isActive("/blog") ? styles.active : ""}`}
            aria-current={isActive("/blog") ? "page" : undefined}
            onClick={closeMenu}
          >
            Blog
          </Link>

          <Link
            href="/about"
            className={`${styles.navLink} ${isActive("/about") ? styles.active : ""}`}
            aria-current={isActive("/about") ? "page" : undefined}
            onClick={closeMenu}
          >
            Sobre Mí
          </Link>

          <Link
            href="/contact"
            className={`${styles.navLink} ${isActive("/contact") ? styles.active : ""}`}
            aria-current={isActive("/contact") ? "page" : undefined}
            onClick={closeMenu}
          >
            Contacto
          </Link>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

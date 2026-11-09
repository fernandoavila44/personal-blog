
'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import ThemeToggle from './ThemeToggle';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link
                    href="/"
                    className={styles.logo}
                    onClick={closeMenu}
                >
                    <h1>Mi Blog Personal</h1>
                </Link>

                <div className={styles.actions}>
                    <ThemeToggle />

                    <button
                        type="button"
                        className={`${styles.menuButton} ${menuOpen ? styles.menuButtonOpen : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                        aria-expanded={menuOpen}
                        aria-controls="main-navigation"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                <nav
                    id="main-navigation"
                    className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
                >
                    <Link
                        href="/"
                        className={styles.navLink}
                        onClick={closeMenu}
                    >
                        Inicio
                    </Link>

                    <Link
                        href="/blog"
                        className={styles.navLink}
                        onClick={closeMenu}
                    >
                        Blog
                    </Link>

                    <Link
                        href="/about"
                        className={styles.navLink}
                        onClick={closeMenu}
                    >
                        Sobre Mí
                    </Link>

                    <Link
                        href="/contact"
                        className={styles.navLink}
                        onClick={closeMenu}
                    >
                        Contacto
                    </Link>
                </nav>
            </div>
        </header>
    );
}

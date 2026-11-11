
'use client';

import Link from 'next/link';
import styles from './Header.module.scss';
import { useTheme } from '@/context/ThemeContext';

export default function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <h1>
                        SantiDev<span>.</span>
                    </h1>
                </Link>

                <nav className={styles.nav}>
                    <Link href="/" className={styles.navLink}>
                        Inicio
                    </Link>

                    <Link href="/blog" className={styles.navLink}>
                        Blog
                    </Link>

                    <Link href="/about" className={styles.navLink}>
                        Sobre mí
                    </Link>

                    <Link href="/contact" className={styles.navLink}>
                        Contacto
                    </Link>

                    <button
                        type="button"
                        className={styles.themeButton}
                        onClick={toggleTheme}
                        aria-label={
                            theme === 'light'
                                ? 'Activar modo oscuro'
                                : 'Activar modo claro'
                        }
                        title={
                            theme === 'light'
                                ? 'Activar modo oscuro'
                                : 'Activar modo claro'
                        }
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                        <span>
                            {theme === 'light' ? 'Oscuro' : 'Claro'}
                        </span>
                    </button>
                </nav>
            </div>
        </header>
    );
}

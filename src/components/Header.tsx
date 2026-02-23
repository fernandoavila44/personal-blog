import Link from 'next/link';
import styles from './Header.module.scss';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <h1>Mi Blog Personal</h1>
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Inicio
          </Link>
          <Link href="/blog" className={styles.navLink}>
            Blog
          </Link>
          <Link href="/about" className={styles.navLink}>
            Sobre Mí
          </Link>
          <Link href="/contact" className={styles.navLink}>
            Contacto
          </Link>

          {/* 🔹 Toggle de tema */}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

"use client"; 

import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <h1>Mi Blog Personal</h1>
        </Link>

        
        <div
          className={`${styles.menuToggle} ${open ? styles.active : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        
        <nav className={`${styles.nav} ${open ? styles.show : ""}`}>
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
        </nav>
      </div>
    </header>
  );
}


import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>

                    {/* Identidad de SantiDev */}
                    <div className={styles.section}>
                        <Link href="/" className={styles.logo}>
                            SantiDev<span>.</span>
                        </Link>

                        <p>
                            Soy Santiago Valencia. Este es mi espacio personal
                            para compartir aprendizajes, proyectos y experiencias
                            sobre tecnología y desarrollo web.
                        </p>
                    </div>

                    {/* Navegación */}
                    <div className={styles.section}>
                        <h4>Explora</h4>

                        <nav className={styles.links}>
                            <Link href="/">Inicio</Link>
                            <Link href="/blog">Blog</Link>
                            <Link href="/about">Sobre mí</Link>
                            <Link href="/contact">Contacto</Link>
                        </nav>
                    </div>

                    {/* Redes sociales */}
                    <div className={styles.section}>
                        <h4>Encuéntrame</h4>

                        <div className={styles.social}>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>

                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>

                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Twitter / X
                            </a>
                        </div>
                    </div>
                </div>

                {/* Derechos reservados */}
                <div className={styles.bottom}>
                    <p>
                        © {currentYear} SantiDev. Creado por Santiago Valencia.
                        Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}

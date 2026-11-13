import Link from "next/link";
import authorData from "@/data/author.json";
import styles from "./Footer.module.scss";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3>Mi Blog Personal</h3>
            <p>Compartiendo conocimiento sobre desarrollo web y tecnología.</p>
          </div>

          <div className={styles.section}>
            <h4>Enlaces</h4>
            <nav className={styles.links}>
              <Link href="/">Inicio</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/about">Sobre Mí</Link>
              <Link href="/contact">Contacto</Link>
            </nav>
          </div>

          <div className={styles.section}>
            <h4>Redes y Contacto</h4>
            <div className={styles.social}>
              <a
                href={authorData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                GitHub
              </a>
              <a
                href={authorData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a
                href={authorData.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${authorData.email}`}
                aria-label="Enviar correo electrónico"
              >
                Correo Electrónico
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            &copy; {currentYear} Mi Blog Personal. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
import authorData from "@/data/author.json";
import styles from "./page.module.scss";
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";

export const dynamic = "force-dynamic";

export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>
      <div className="container">
        <section className={styles.hero}>
          <div className={styles.profileImage}>
            <Image
              src={authorData.avatar}
              alt={`Foto de perfil de ${authorData.name}`}
              width={280}
              height={280}
              priority
            />
          </div>

          <div className={styles.intro}>
            <span className={styles.eyebrow}>Conóceme</span>
            <h1>{authorData.name}</h1>
            <p className={styles.role}>{authorData.role}</p>
            <p className={styles.location}>{authorData.location}</p>
          </div>
        </section>

        <div className={styles.contentGrid}>
          <section className={styles.contentCard}>
            <h2>Sobre mí</h2>
            <p>{authorData.bio}</p>
          </section>

          <section className={styles.contentCard}>
            <h2>Habilidades</h2>
            <div className={styles.skillList}>
              {authorData.skills.map((skill) => (
                <span className={styles.skill} key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className={styles.contentCard}>
            <h2>Experiencia</h2>
            <p>{authorData.experience}</p>
          </section>

          <section className={styles.contentCard}>
            <h2>Educación</h2>
            <p>{authorData.education}</p>
          </section>
        </div>

        <section className={styles.social}>
          <h2>Contacto y Redes Sociales</h2>

          <div className={styles.socialLinks}>
            <a
              href={`mailto:${authorData.email}`}
              aria-label="Correo electrónico"
              title="Correo electrónico"
            >
              <FaEnvelope />
            </a>

            <a
              href={authorData.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <FaGithub />
            </a>

            <a
              href={authorData.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>

            <a
              href={authorData.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

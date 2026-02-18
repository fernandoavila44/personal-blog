import Image from 'next/image';
import authorData from '@/data/author.json';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic'; // fuerza SSR

const author = authorData;

export default function AboutPage() {
  return (
    <main className={styles.container}>
      {/* Header */}
      <section className={styles.header}>
        <Image
          src={author.photo}
          alt={`Foto de ${author.name}`}
          width={180}
          height={180}
          className={styles.avatar}
          priority
        />

        <div>
          <h1>{author.name}</h1>
          <h2>{author.role}</h2>
        </div>
      </section>

      {/* Bio */}
      <section className={styles.section}>
        <h3>Biografía</h3>
        <p>{author.bio}</p>
      </section>

      {/* Skills */}
      <section className={styles.section}>
        <h3>Habilidades</h3>
        <div className={styles.skills}>
          {author.skills.map((skill: string) => (
            <span key={skill} className={styles.skill}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Experiencia */}
      <section className={styles.section}>
        <h3>Experiencia</h3>
        <ul>
          {author.experience.map((exp: string, index: number) => (
            <li key={index}>{exp}</li>
          ))}
        </ul>
      </section>

      {/* Educación */}
      <section className={styles.section}>
        <h3>Educación</h3>
        <ul>
          {author.education.map((edu: string, index: number) => (
            <li key={index}>{edu}</li>
          ))}
        </ul>
      </section>

      {/* Redes */}
      <section className={styles.section}>
        <h3>Redes</h3>
        <div className={styles.socials}>
          <a href={author.socials.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={author.socials.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={author.socials.twitter} target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        </div>
      </section>
    </main>
  );
}

// Metadata dinámica (SEO)
export async function generateMetadata() {
  return {
    title: `Sobre ${authorData.name} | Blog`,
    description: authorData.bio,
  };
}

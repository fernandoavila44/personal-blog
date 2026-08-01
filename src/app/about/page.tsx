import Image from 'next/image';
import authorData from '@/data/author.json';
import styles from './page.module.scss';

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.hero}>
        <Image
          src={authorData.avatar}  
          alt={authorData.name}
          width={150}
          height={150}
          className={styles.profileImage}
        />
        <h1>{authorData.name}</h1>
        <p>{authorData.role}</p>
      </div>

      <div className={styles.bio}>
        <h2>Sobre mí</h2>
        <p>{authorData.bio}</p>
      </div>

      <div className={styles.skills}>
        <h2>Habilidades</h2>
        <ul>
          {authorData.skills.map((skill) => (
            <li key={skill} className={styles.skillItem}>
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.experience}>
        <h2>Experiencia</h2>
        <p>{authorData.experience}</p>
      </div>

      <div className={styles.education}>
        <h2>Educación</h2>
        <p>{authorData.education}</p>
      </div>

      <div className={styles.social}>
        <h2>Redes Sociales</h2>
        <a href={authorData.social.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={authorData.social.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={authorData.social.twitter} target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
      </div>
    </div>
  );
}


export async function generateMetadata() {
  return {
    title: `Sobre ${authorData.name} | Mi Blog Personal`,
    description: authorData.bio,
  };
}

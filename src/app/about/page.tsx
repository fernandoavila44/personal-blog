import Image from 'next/image';
import authorData from '@/data/author.json';
import styles from './page.module.scss';

export async function generateMetadata() {
    return {
        title: `Sobre ${authorData.name} | Mi Blog Personal`,
        description: authorData.bio,
    };
}

export default function AboutPage() {
    const author = authorData;

    return (
        <div className={styles.aboutPage}>
            <div className="container">
                <div className={styles.content}>
                    <section className={styles.header}>
                        <div className={styles.imageContainer}>
                            {author.avatar ? (
                                <Image
                                    src={author.avatar}
                                    alt={`Foto de ${author.name}`}
                                    width={150}
                                    height={150}
                                    className={styles.avatar}
                                />
                            ) : (
                                <div className={styles.avatarPlaceholder}>
                                    <span>{author.name.charAt(0)}</span>
                                </div>
                            )}
                        </div>
                        <div className={styles.headerInfo}>
                            <h1>{author.name}</h1>
                            <h2>{author.role}</h2>
                            <p className={styles.location}>📍 {author.location}</p>
                            <p className={styles.email}>✉️ {author.email}</p>
                        </div>
                    </section>

                    <section className={styles.bio}>
                        <h3>Biografía</h3>
                        <p>{author.bio}</p>
                    </section>

                    <div className={styles.grid}>
                        <section className={styles.skills}>
                            <h3>Habilidades</h3>
                            <div className={styles.tags}>
                                {author.skills.map((skill) => (
                                    <span key={skill} className={styles.tag}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section className={styles.experience}>
                            <h3>Experiencia y Educación</h3>
                            <div className={styles.card}>
                                <h4>💼 Experiencia</h4>
                                <p>{author.experience}</p>
                            </div>
                            <div className={styles.card}>
                                <h4>🎓 Educación</h4>
                                <p>{author.education}</p>
                            </div>
                        </section>
                    </div>

                    <section className={styles.social}>
                        <h3>Conéctate conmigo</h3>
                        <div className={styles.socialLinks}>
                            <a href={author.social.github} target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>
                            <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer">
                                LinkedIn
                            </a>
                            <a href={author.social.twitter} target="_blank" rel="noopener noreferrer">
                                Twitter
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

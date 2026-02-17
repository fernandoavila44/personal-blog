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
        <section className={styles.about}>
            <div className="container">
                <div className={styles.header}>
                    <div className={styles.avatarWrapper}>
                        <Image
                            src={author.avatar}
                            alt={author.name}
                            width={180}
                            height={180}
                            className={styles.avatar}
                        />
                    </div>

                    <div className={styles.info}>
                        <h1>{author.name}</h1>
                        <h2>{author.role}</h2>
                        <p className={styles.location}>{author.location}</p>

                        <div className={styles.social}>
                            <a href={author.social.github} target="_blank">
                                GitHub
                            </a>
                            <a href={author.social.linkedin} target="_blank">
                                LinkedIn
                            </a>
                            <a href={author.social.twitter} target="_blank">
                                Twitter
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.content}>
                    <section className={styles.section}>
                        <h3>Biografía</h3>
                        <p>{author.bio}</p>
                    </section>

                    <section className={styles.section}>
                        <h3>Habilidades</h3>
                        <div className={styles.skills}>
                            {author.skills.map((skill) => (
                                <span key={skill} className={styles.skill}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h3>Experiencia</h3>
                        <p>{author.experience}</p>
                    </section>

                    <section className={styles.section}>
                        <h3>Educación</h3>
                        <p>{author.education}</p>
                    </section>

                    <section className={styles.section}>
                        <h3>Contacto</h3>
                        <p>{author.email}</p>
                    </section>
                </div>
            </div>
        </section>
    );
}

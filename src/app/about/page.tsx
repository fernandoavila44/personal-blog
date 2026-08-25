import authorData from '@/data/author.json';
import styles from './page.module.scss';

export async function generateMetadata() {
    return {
        title: `Sobre ${authorData.name} | Mi Blog Personal`,
        description: authorData.bio,
    };
}

export default function AboutPage() {
    const initials = authorData.name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className={styles.aboutPage}>
            <div className="container">
                <div className={styles.hero}>
                    <div className={styles.avatar}>{initials}</div>
                    <div>
                        <h1>{authorData.name}</h1>
                        <p className={styles.role}>{authorData.role}</p>
                        <p className={styles.location}>📍 {authorData.location}</p>
                    </div>
                </div>

                <div className={styles.content}>
                    <section className={styles.bio}>
                        <h2>Sobre mí</h2>
                        <p>{authorData.bio}</p>
                    </section>

                    <section className={styles.skills}>
                        <h2>Habilidades</h2>
                        <ul className={styles.skillsList}>
                            {authorData.skills.map((skill) => (
                                <li key={skill} className={styles.skillTag}>
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className={styles.details}>
                        <div>
                            <h2>Experiencia</h2>
                            <p>{authorData.experience}</p>
                        </div>
                        <div>
                            <h2>Educación</h2>
                            <p>{authorData.education}</p>
                        </div>
                    </section>

                    <section className={styles.social}>
                        <h2>Encuéntrame en</h2>
                        <div className={styles.socialLinks}>
                            <a href={authorData.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                LinkedIn
                            </a>
                            <a href={`mailto:${authorData.email}`} className="btn btn-primary">
                                Enviar email
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

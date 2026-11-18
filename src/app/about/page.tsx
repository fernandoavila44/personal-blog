import Image from 'next/image';
import authorData from '@/data/author.json';
import styles from './page.module.scss';

// Server Component: se ejecuta en el servidor (no lleva 'use client')
export default function AboutPage() {
    return (
        <div className={styles.aboutPage}>
            <div className="container">
                <div className={styles.layout}>
                    {/* Foto, nombre y rol */}
                    <div className={styles.hero}>
                        <Image
                            src={authorData.avatar}
                            alt={authorData.name}
                            width={200}
                            height={200}
                            className={styles.avatar}
                        />
                        <h1>{authorData.name}</h1>
                        <p>{authorData.role}</p>
                    </div>

                    <div>
                        {/* Biografía */}
                        <div className={styles.bio}>
                            <h2>Sobre mí</h2>
                            <p>{authorData.bio}</p>
                        </div>

                        {/* Habilidades */}
                        <div className={styles.skills}>
                            <h2>Habilidades</h2>
                            <ul>
                                {authorData.skills.map(skill => (
                                    <li key={skill}>{skill}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Experiencia */}
                        <div className={styles.bio}>
                            <h2>Experiencia</h2>
                            <p>{authorData.experience}</p>
                        </div>

                        {/* Educación */}
                        <div className={styles.bio}>
                            <h2>Educación</h2>
                            <p>{authorData.education}</p>
                        </div>

                        {/* Redes sociales */}
                        <div className={styles.social}>
                            <a href={authorData.social.github}>GitHub</a>
                            <a href={authorData.social.linkedin}>LinkedIn</a>
                            <a href={authorData.social.twitter}>Twitter</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
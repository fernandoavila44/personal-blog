
import Image from 'next/image';
import type { Metadata } from 'next';
import authorData from '@/data/author.json';
import styles from './page.module.scss';

const author = authorData;

export function generateMetadata(): Metadata {
    return {
        title: `Sobre ${author.name} | SantiDev`,
        description: author.bio,
    };
}

export default function AboutPage() {
    const socialLinks = [
        {
            name: 'GitHub',
            url: author.social.github,
        },
        {
            name: 'LinkedIn',
            url: author.social.linkedin,
        },
        {
            name: 'Twitter / X',
            url: author.social.twitter,
        },
    ].filter((social) => social.url.trim() !== '');

    return (
        <main className={styles.about}>

            {/* Presentación personal */}
            <section className={styles.hero}>
                <div className={styles.profile}>
                    <div className={styles.avatar}>
                        <Image
                            src={author.avatar}
                            alt={`Fotografía de ${author.name}`}
                            width={220}
                            height={220}
                            priority
                        />
                    </div>

                    <div className={styles.introduction}>
                        <span className={styles.eyebrow}>
                            CONOCE AL CREADOR DE SANTIDEV
                        </span>

                        <h1>Hola, soy {author.name}.</h1>

                        <h2>{author.role}</h2>

                        <p className={styles.location}>
                            📍 {author.location}
                        </p>

                        <p className={styles.bio}>
                            {author.bio}
                        </p>

                        {author.email && (
                            <a
                                href={`mailto:${author.email}`}
                                className={styles.contactButton}
                            >
                                Hablemos →
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* Mi historia */}
            <section className={styles.section}>
                <div className={styles.sectionHeading}>
                    <span className={styles.eyebrow}>MI HISTORIA</span>
                    <h2>Aprender, crear y evolucionar.</h2>
                </div>

                <div className={styles.storyCard}>
                    <p>
                        SantiDev nace como un espacio personal para documentar
                        mi camino en el mundo de la tecnología.
                    </p>

                    <p>
                        Me interesa aprender sobre programación, desarrollo
                        web y creación de proyectos digitales. Creo que cada
                        proyecto es una oportunidad para adquirir nuevas
                        habilidades y convertir ideas en algo real.
                    </p>

                    <p>
                        Aquí comparto lo que voy aprendiendo, los retos que
                        encuentro y los proyectos que construyo durante mi
                        formación.
                    </p>
                </div>
            </section>

            {/* Tecnologías */}
            <section className={styles.section}>
                <div className={styles.sectionHeading}>
                    <span className={styles.eyebrow}>MI APRENDIZAJE</span>
                    <h2>Tecnologías que estoy explorando</h2>
                    <p className={styles.sectionDescription}>
                        Herramientas y tecnologías que forman parte de mi
                        proceso de aprendizaje.
                    </p>
                </div>

                <div className={styles.skills}>
                    {author.skills.map((skill) => (
                        <div key={skill} className={styles.skillCard}>
                            {skill}
                        </div>
                    ))}
                </div>
            </section>

            {/* Formación */}
            <section className={styles.section}>
                <div className={styles.sectionHeading}>
                    <span className={styles.eyebrow}>MI FORMACIÓN</span>
                    <h2>El camino que estoy construyendo</h2>
                </div>

                <div className={styles.infoGrid}>
                    <div className={styles.infoCard}>
                        <span className={styles.cardIcon}>🎓</span>

                        <div>
                            <h3>Educación</h3>
                            <p>{author.education}</p>
                        </div>
                    </div>

                    <div className={styles.infoCard}>
                        <span className={styles.cardIcon}>💻</span>

                        <div>
                            <h3>Experiencia y proyectos</h3>
                            <p>{author.experience}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Redes sociales */}
            {socialLinks.length > 0 && (
                <section className={styles.section}>
                    <div className={styles.sectionHeading}>
                        <span className={styles.eyebrow}>CONECTEMOS</span>
                        <h2>Encuéntrame en internet</h2>
                    </div>

                    <div className={styles.socialLinks}>
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialButton}
                            >
                                {social.name}
                                <span> ↗</span>
                            </a>
                        ))}
                    </div>
                </section>
            )}

        </main>
    );
}

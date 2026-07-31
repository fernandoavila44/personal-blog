import author from '@/data/author.json';
import styles from './page.module.scss';

// Fuerza el renderizado en el servidor para este ejercicio.
export const dynamic = 'force-dynamic';

export default function AboutPage() {
    return (
        <div className={`container ${styles.about}`}>
            <section className={styles.intro}>
                <div className={styles.avatar}>{author.name.charAt(0)}</div>
                <div>
                    <h1>{author.name}</h1>
                    <p className={styles.role}>{author.role}</p>
                </div>
            </section>

            <section className={styles.bio}><h2>Sobre mí</h2><p>{author.bio}</p></section>
            <section><h2>Habilidades</h2><div className={styles.skills}>{author.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></section>
            <section><h2>Experiencia</h2><p>{author.experience}</p></section>
            <section><h2>Educación</h2><p>{author.education}</p></section>
            <section><h2>Encuéntrame en</h2><div className={styles.links}><a href={author.social.github}>GitHub</a><a href={author.social.linkedin}>LinkedIn</a><a href={author.social.twitter}>Twitter</a><a href={`mailto:${author.email}`}>Correo</a></div></section>
        </div>
    );
}

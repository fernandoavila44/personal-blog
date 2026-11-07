import Image from 'next/image';
import authorData from '@/data/author.json';

// Fuerza SSR: la página se genera en el servidor en cada request
export const dynamic = 'force-dynamic';

const author = authorData;

export async function generateMetadata() {
    return {
        title: `Sobre ${author.name} | Mi Blog Personal`,
        description: author.bio,
    };
}

export default function AboutPage() {
    return (
        <div className="container" style={{ padding: '4rem 1.5rem' }}>
            <h1>Sobre Mí</h1>

            <section>
                <Image
                    src={author.avatar}
                    alt={`Foto de ${author.name}`}
                    width={150}
                    height={150}
                />
                <h2>{author.name}</h2>
                <p>{author.role}</p>
                <p>{author.location}</p>
            </section>

            <section>
                <h2>Biografía</h2>
                <p>{author.bio}</p>
            </section>

            <section>
                <h2>Habilidades</h2>
                <ul>
                    {author.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Experiencia</h2>
                <p>{author.experience}</p>
            </section>

            <section>
                <h2>Educación</h2>
                <p>{author.education}</p>
            </section>

            <section>
                <h2>Contacto y redes</h2>
                <p>{author.email}</p>
                <a href={author.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                {' · '}
                <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                {' · '}
                <a href={author.social.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
            </section>
        </div>
    );
}
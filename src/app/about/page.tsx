import Link from 'next/link';
import authorData from '@/data/author.json';

export function generateMetadata() {
    return {
        title: `Sobre ${authorData.name} | Mi Blog Personal`,
        description: authorData.bio,
    };
}

export default function AboutPage() {
    const author = authorData;

    return (
        <div style={{ padding: '4rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            {/* Header con nombre */}
            <div style={{ marginBottom: '4rem' }}>
                <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem' }}>{author.name}</h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: '#666',
                    margin: '0 0 1rem 0'
                }}>{author.role}</p>
                <p style={{ margin: '0.5rem 0', color: '#666' }}>
                    📍 {author.location}
                </p>
                <p style={{ margin: '0.5rem 0', color: '#666' }}>
                    ✉️ {author.email}
                </p>
            </div>

            {/* Redes sociales */}
            <div style={{ marginBottom: '4rem' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Conéctate Conmigo</h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <a
                        href={author.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-block',
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#333',
                            color: '#fff',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        GitHub
                    </a>
                </div>
            </div>

            {/* Biografía */}
            <div style={{ marginBottom: '4rem' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Biografía</h2>
                <p style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    color: '#555'
                }}>
                    {author.bio}
                </p>
            </div>

            {/* Skills */}
            <div style={{ marginBottom: '4rem' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Habilidades</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '1rem'
                }}>
                    {author.skills.map((skill) => (
                        <div
                            key={skill}
                            style={{
                                padding: '1rem',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '6px',
                                textAlign: 'center',
                                fontWeight: '500'
                            }}
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            </div>

            {/* Experiencia y Educación */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem',
                marginBottom: '4rem'
            }}>
                <div>
                    <h2 style={{ marginBottom: '1.5rem' }}>Experiencia</h2>
                    <p style={{ fontSize: '1.1rem', color: '#555' }}>
                        {author.experience}
                    </p>
                </div>
                <div>
                    <h2 style={{ marginBottom: '1.5rem' }}>Educación</h2>
                    <p style={{ fontSize: '1.1rem', color: '#555' }}>
                        {author.education}
                    </p>
                </div>
            </div>

            {/* Call to action */}
            <div style={{
                textAlign: 'center',
                padding: '2rem',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px'
            }}>
                <h3 style={{ marginBottom: '1rem' }}>¿Quieres trabajar juntos?</h3>
                <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                    Estaré encantado de escuchar sobre tu proyecto
                </p>
                <Link href="/contact" style={{
                    display: 'inline-block',
                    padding: '0.75rem 2rem',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'background-color 0.2s'
                }}>
                    Contáctame
                </Link>
            </div>
        </div>
    );
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import postsData from '@/data/posts.json';
import CommentSection from '@/components/CommentSection';

interface Post {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    date: string;
    category: string;
    readTime: string;
    content: string;
    author: string;
    image?: string;
}

// Generar rutas estáticas en build time
export async function generateStaticParams() {
    return (postsData as Post[]).map((post) => ({
        slug: post.slug,
    }));
}

// Generar metadata dinámico para SEO
export function generateMetadata({ params }: { params: { slug: string } }) {
    const post = (postsData as Post[]).find((p) => p.slug === params.slug);
    
    if (!post) {
        return {
            title: 'Post no encontrado',
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
    };
}

export default function PostPage({ params }: { params: { slug: string } }) {
    const post = (postsData as Post[]).find((p) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div style={{ padding: '4rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
            {/* Header del post */}
            <article>
                <div style={{ marginBottom: '2rem' }}>
                    <Link href="/blog" style={{
                        color: '#007bff',
                        textDecoration: 'none',
                        marginBottom: '1rem',
                        display: 'inline-block'
                    }}>
                        ← Volver al blog
                    </Link>
                </div>

                <h1 style={{
                    fontSize: '2.5rem',
                    marginBottom: '1rem',
                    lineHeight: '1.2'
                }}>
                    {post.title}
                </h1>

                {/* Metadata */}
                <div style={{
                    display: 'flex',
                    gap: '2rem',
                    flexWrap: 'wrap',
                    marginBottom: '2rem',
                    paddingBottom: '2rem',
                    borderBottom: '1px solid #eee',
                    fontSize: '0.95rem',
                    color: '#666'
                }}>
                    <span>
                        📅 {new Date(post.date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </span>
                    <span>📂 {post.category}</span>
                    <span>🕐 {post.readTime}</span>
                    <span>✍️ {post.author}</span>
                </div>

                {/* Contenido del post */}
                <div style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    color: '#333',
                    marginBottom: '3rem'
                }}>
                    {post.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} style={{ marginBottom: '1.5rem' }}>
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Info del autor */}
                <div style={{
                    padding: '2rem',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    marginBottom: '3rem'
                }}>
                    <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Sobre el autor</h3>
                    <p style={{ margin: 0, color: '#666' }}>
                        {post.author} es un desarrollador apasionado por crear experiencias web increíbles
                        con Next.js y React.
                    </p>
                </div>

                {/* Navegación a otros posts */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '2rem',
                    paddingTop: '2rem',
                    borderTop: '1px solid #eee'
                }}>
                    <Link href="/blog" style={{
                        display: 'inline-block',
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        transition: 'background-color 0.2s'
                    }}>
                        ← Todos los posts
                    </Link>
                    <Link href="/contact" style={{
                        display: 'inline-block',
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        transition: 'background-color 0.2s'
                    }}>
                        Contáctame →
                    </Link>
                </div>

                {/* Sección de comentarios */}
                <CommentSection />
            </article>
        </div>
    );
}

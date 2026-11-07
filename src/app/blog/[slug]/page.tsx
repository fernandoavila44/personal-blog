import Link from 'next/link';
import { notFound } from 'next/navigation';
import postsData from '@/data/posts.json';
import CommentSection from '@/components/CommentSection';

// Le dice a Next.js qué páginas generar estáticamente en el build (SSG)
export async function generateStaticParams() {
    return postsData.map((post) => ({
        slug: post.slug,
    }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    // En las versiones nuevas de Next.js, params es una promesa
    const { slug } = await params;

    // Buscar el post usando el slug
    const post = postsData.find((p) => p.slug === slug);

    // Si no existe, muestra la página 404
    if (!post) {
        notFound();
    }

    return (
        <article>
            <h1>{post.title}</h1>

            <div>
                <time>{new Date(post.date).toLocaleDateString()}</time>
                <span> · {post.category}</span>
                <span> · {post.readTime}</span>
            </div>

            <div>{post.content}</div>

            <Link href="/blog">← Volver al blog</Link>

            <CommentSection />
        </article>
    );
}
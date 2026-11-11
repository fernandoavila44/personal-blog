
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import postsData from '@/data/posts.json';
import styles from './page.module.scss';

export const metadata = {
  title: 'SantiDev | Tecnología, Desarrollo y Aprendizaje',
  description:
    'Soy Santiago Valencia. Bienvenido a SantiDev, mi espacio personal para compartir proyectos, aprendizajes y experiencias sobre tecnología y desarrollo web.',
};

export default function Home() {
  const latestPosts = postsData.slice(0, 3);

  return (
    <main className={styles.home}>
      {/* Presentación principal */}
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.heroTag}>
            SANTIAGO VALENCIA · BLOG PERSONAL
          </span>

          <h1 className={styles.heroTitle}>
            Construyendo mi camino en el mundo de la{' '}
            <span>tecnología.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            ¡Hola! Soy Santiago. Este es SantiDev, un espacio donde comparto
            mis aprendizajes, proyectos y experiencias mientras descubro
            todo lo que puedo crear con la tecnología.
          </p>

          <div className={styles.heroButtons}>
            <Link href="/blog" className="btn btn-primary">
              Explorar publicaciones →
            </Link>

            <Link href="/about" className="btn btn-secondary">
              Conóceme
            </Link>
          </div>

          <div className={styles.heroFooter}>
            <span>Desarrollo web</span>
            <span>Aprendizaje continuo</span>
            <span>Proyectos digitales</span>
          </div>
        </div>
      </section>

      {/* Últimas publicaciones */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionTag}>MI CONTENIDO</span>
              <h2 className={styles.sectionTitle}>
                Últimas publicaciones
              </h2>
              <p className={styles.sectionDescription}>
                Ideas, conocimientos y experiencias que quiero compartir.
              </p>
            </div>
          </div>

          <div className={styles.postsGrid}>
            {latestPosts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                slug={post.slug}
                date={post.date}
                category={post.category}
                readTime={post.readTime}
              />
            ))}
          </div>

          <div className={styles.viewAll}>
            <Link href="/blog" className="btn btn-primary">
              Ver todas las publicaciones →
            </Link>
          </div>
        </div>
      </section>

      {/* Presentación personal */}
      <section className={`section ${styles.aboutPreview}`}>
        <div className="container">
          <div className={styles.aboutContent}>
            <span className={styles.sectionTag}>UN POCO SOBRE MÍ</span>

            <h2>
              Detrás de <span>SantiDev</span> está Santiago.
            </h2>

            <p>
              Soy estudiante de Ingeniería de Software y una persona
              interesada en la tecnología, la programación y la creación
              de proyectos digitales. Este blog es mi espacio para
              documentar lo que aprendo, compartir mis avances y mostrar
              mi evolución en este mundo.
            </p>

            <Link href="/about" className="btn btn-secondary">
              Conoce mi historia →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

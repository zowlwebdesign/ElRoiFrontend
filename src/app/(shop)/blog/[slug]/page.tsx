import { notFound } from 'next/navigation';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import styles from './page.module.css';
import { getBlogBySlug } from '@/services/blog';
import { getStrapiImageUrl } from '@/services/productos';

export const revalidate = 60;

export default async function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className={`${styles.main} padding-mobile padding-desktop`}>
      {/* Article Header */}
      <header className={styles.header}>
        {blog.categoria_blog && (
          <div className={styles.category}>
            <div className={styles.categoryDot}></div>
            <span className={styles.categoryText}>{blog.categoria_blog.nombre}</span>
          </div>
        )}
        <h1 className={styles.title}>{blog.titulo}</h1>
      </header>

      {/* Article Hero Image */}
      <div className={`${styles.heroImgWrap} deckle-edge soft-shadow`}>
        <img 
          className={styles.heroImg} 
          alt={blog.titulo} 
          src={getStrapiImageUrl(blog.imagen_principal.url)} 
        />
      </div>

      {/* Article Body */}
      <article className={styles.articleBody}>
        <BlocksRenderer content={blog.descripcion} />
      </article>

      {/* Secondary Images (if any) */}
      {blog.imagenes_secundarias && blog.imagenes_secundarias.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '3rem' }}>
          {blog.imagenes_secundarias.map((img, i) => (
            <div key={i} className={`deckle-edge soft-shadow`} style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
              <img 
                src={getStrapiImageUrl(img.url)} 
                alt={`${blog.titulo} - img ${i+1}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

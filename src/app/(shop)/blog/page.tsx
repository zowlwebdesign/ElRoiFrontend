import styles from './page.module.css';
import { getBlogs, getCategoriasBlog } from '@/services/blog';
import BlogFilters from '@/components/BlogFilters';

export const revalidate = 60;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const [blogs, categorias, params] = await Promise.all([
    getBlogs(),
    getCategoriasBlog(),
    searchParams,
  ]);

  return (
    <main className={`${styles.main} container-max padding-mobile padding-desktop`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Sacred Narratives</h1>
        <p className={styles.subtitle}>
          Explorations of faith, design, and the threads that weave our stories together under the watchful eye of El Roi.
        </p>
      </header>

      <BlogFilters 
        blogs={blogs} 
        categorias={categorias}
        initialCategoria={params.categoria ?? null}
      />
    </main>
  );
}


import styles from './page.module.css';
import { getProductos, getCategorias } from '@/services/productos';
import TiendaFilters from '@/components/TiendaFilters';

export const revalidate = 60;

export default async function Tienda({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const [productos, categorias, params] = await Promise.all([
    getProductos(),
    getCategorias(),
    searchParams,
  ]);

  return (
    <main className={`${styles.main} container-max padding-mobile padding-desktop`}>
      <header className={styles.header}>
        <h1 className={styles.title}>TIENDA</h1>
        <p className={styles.subtitle}>
          Descubre nuestra colección de prendas con propósito, diseñadas para reflejar
          la luz y la verdad en cada detalle táctil.
        </p>
      </header>

      <TiendaFilters
        productos={productos}
        categorias={categorias}
        initialCategoria={params.categoria ?? null}
      />
    </main>
  );
}

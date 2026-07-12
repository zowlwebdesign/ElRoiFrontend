'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './TiendaFilters.module.css';
import type { Producto } from '@/types/producto';
import type { Categoria } from '@/services/productos';
import { getStrapiImageUrl, formatPrice } from '@/services/productos';
import { useCartStore } from '@/store/cartStore';

interface Props {
  productos: Producto[];
  categorias: Categoria[];
  initialCategoria?: string | null;
}

const SORT_OPTIONS = [
  { label: 'Relevancia', value: 'default' },
  { label: 'Precio: menor a mayor', value: 'price-asc' },
  { label: 'Precio: mayor a menor', value: 'price-desc' },
  { label: 'Nombre A–Z', value: 'name-asc' },
];

export default function TiendaFilters({ productos, categorias, initialCategoria = null }: Props) {
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(initialCategoria);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [precioMax, setPrecioMax] = useState<number>(() => {
    const maxVal = Math.max(...productos.map((p) => p.precio_base), 0);
    return Math.ceil(maxVal);
  });

  const addItem = useCartStore((state) => state.addItem);

  const precioAbsolutoMax = useMemo(() => {
    return Math.ceil(Math.max(...productos.map((p) => p.precio_base), 0));
  }, [productos]);

  // Filtrado
  const productosFiltrados = useMemo(() => {
    let lista = [...productos];

    // Por categoría
    if (categoriaActiva) {
      lista = lista.filter((p) => p.categoria_producto?.slug === categoriaActiva);
    }

    // Por búsqueda
    if (search.trim()) {
      const q = search.toLowerCase();
      lista = lista.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.descripcion_corta.toLowerCase().includes(q)
      );
    }

    // Por precio máximo
    lista = lista.filter((p) => p.precio_base <= precioMax);

    // Ordenamiento
    if (sort === 'price-asc') lista.sort((a, b) => a.precio_base - b.precio_base);
    if (sort === 'price-desc') lista.sort((a, b) => b.precio_base - a.precio_base);
    if (sort === 'name-asc') lista.sort((a, b) => a.nombre.localeCompare(b.nombre));

    return lista;
  }, [productos, categoriaActiva, search, precioMax, sort]);

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.filterBox}>
          <h2 className={styles.filterTitle}>Filtros</h2>

          {/* Búsqueda */}
          <div className={styles.filterGroup}>
            <div className={styles.searchWrap}>
              <input
                className={styles.searchInput}
                placeholder="Buscar..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
            </div>
          </div>

          {/* Categorías */}
          <div className={`${styles.filterGroup} ${styles.filterGroupBordered}`}>
            <h3 className={styles.filterGroupTitle}>Categorías</h3>
            <ul className={styles.filterList}>
              <li>
                <button
                  className={`${styles.filterItem} ${categoriaActiva === null ? styles.filterItemActive : ''}`}
                  onClick={() => setCategoriaActiva(null)}
                >
                  <span className={`${styles.filterDot} ${categoriaActiva === null ? styles.filterDotActive : ''}`} />
                  <span>Todo ({productos.length})</span>
                </button>
              </li>
              {categorias.map((cat) => {
                const count = productos.filter((p) => p.categoria_producto?.slug === cat.slug).length;
                const isActive = categoriaActiva === cat.slug;
                return (
                  <li key={cat.slug}>
                    <button
                      className={`${styles.filterItem} ${isActive ? styles.filterItemActive : ''}`}
                      onClick={() => setCategoriaActiva(isActive ? null : cat.slug)}
                    >
                      <span className={`${styles.filterDot} ${isActive ? styles.filterDotActive : ''}`} />
                      <span>{cat.nombre} ({count})</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Precio máximo */}
          <div className={`${styles.filterGroup} ${styles.filterGroupBordered}`}>
            <h3 className={styles.filterGroupTitle}>Precio máximo</h3>
            <div className={styles.priceWrap}>
              <span className={styles.priceLabel}>{formatPrice(precioMax)}</span>
              <input
                type="range"
                min={0}
                max={precioAbsolutoMax}
                step={1}
                value={precioMax}
                onChange={(e) => setPrecioMax(Number(e.target.value))}
                className={styles.priceRange}
              />
              <div className={styles.priceMinMax}>
                <span>{formatPrice(0)}</span>
                <span>{formatPrice(precioAbsolutoMax)}</span>
              </div>
            </div>
          </div>

          {/* Ordenar */}
          <div className={`${styles.filterGroup} ${styles.filterGroupBordered}`}>
            <h3 className={styles.filterGroupTitle}>Ordenar por</h3>
            <select
              className={styles.sortSelect}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Limpiar filtros */}
          {(categoriaActiva || search || sort !== 'default' || precioMax < precioAbsolutoMax) && (
            <button
              className={styles.clearBtn}
              onClick={() => {
                setCategoriaActiva(null);
                setSearch('');
                setSort('default');
                setPrecioMax(precioAbsolutoMax);
              }}
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </aside>

      {/* Grid */}
      <div className={styles.gridWrap}>
        <p className={styles.resultCount}>
          {productosFiltrados.length} {productosFiltrados.length === 1 ? 'producto' : 'productos'}
          {categoriaActiva && ` en ${categorias.find(c => c.slug === categoriaActiva)?.nombre}`}
        </p>

        {productosFiltrados.length === 0 ? (
          <div className={styles.empty}>
            <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--rose-pale)' }}>
              search_off
            </span>
            <p>No encontramos productos con esos filtros.</p>
            <button
              className={styles.clearBtn}
              onClick={() => {
                setCategoriaActiva(null);
                setSearch('');
                setSort('default');
                setPrecioMax(precioAbsolutoMax);
              }}
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {productosFiltrados.map((producto) => (
              <Link
                key={producto.slug}
                href={`/tienda/${producto.slug}`}
                className={styles.card}
              >
                <div className={styles.cardImgWrap}>
                  <img
                    className={styles.cardImg}
                    alt={producto.nombre}
                    src={getStrapiImageUrl(producto.imagen_principal.url)}
                  />
                  {producto.stock <= 5 && producto.stock > 0 && (
                    <div className={styles.badge}>Últimas</div>
                  )}
                  {producto.stock === 0 && (
                    <div className={`${styles.badge} ${styles.badgeSoldOut}`}>Agotado</div>
                  )}
                  {producto.precio_descuento && (
                    <div className={`${styles.badge} ${styles.badgeSale}`}>Oferta</div>
                  )}
                  {producto.categoria_producto && (
                    <div className={styles.categoryTag}>{producto.categoria_producto.nombre}</div>
                  )}
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{producto.nombre}</h3>
                  <p className={styles.cardDesc}>{producto.descripcion_corta}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardPrice}>
                      {producto.precio_descuento ? (
                        <>
                          <span className={styles.cardPriceOld}>
                            {formatPrice(producto.precio_base)}
                          </span>
                          {formatPrice(producto.precio_descuento)}
                        </>
                      ) : (
                        formatPrice(producto.precio_base)
                      )}
                    </span>
                    <button 
                      className={styles.addBtn} 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        addItem({
                          slug: producto.slug,
                          nombre: producto.nombre,
                          precio: (producto.precio_descuento || producto.precio_base) * 1000,
                          imagen: producto.imagen_principal.url
                        });
                      }}
                    >
                      Añadir
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

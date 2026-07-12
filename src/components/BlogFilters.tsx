'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './BlogFilters.module.css';
import type { Blog, CategoriaBlog } from '@/types/blog';
import type { RichTextBlock, RichTextChild } from '@/types/producto';
import { getStrapiImageUrl } from '@/services/productos'; // reuse the image utility

interface Props {
  blogs: Blog[];
  categorias: CategoriaBlog[];
  initialCategoria?: string | null;
}

const SORT_OPTIONS = [
  { label: 'Más recientes', value: 'default' },
  { label: 'Nombre A–Z', value: 'name-asc' },
];

function extractExcerpt(blocks: RichTextBlock[]): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  
  // Find first non-empty paragraph
  const firstParagraph = blocks.find(
    (b) => b.type === 'paragraph' && b.children && b.children.some(c => c.text.trim().length > 0)
  );
  
  if (!firstParagraph || !firstParagraph.children) return '';
  return firstParagraph.children.map((c: RichTextChild) => c.text).join(' ');
}

export default function BlogFilters({ blogs, categorias, initialCategoria = null }: Props) {
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(initialCategoria);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  // Filtrado
  const blogsFiltrados = useMemo(() => {
    let lista = [...blogs];

    // Por categoría
    if (categoriaActiva) {
      lista = lista.filter((b) => b.categoria_blog?.nombre === categoriaActiva);
    }

    // Por búsqueda
    if (search.trim()) {
      const q = search.toLowerCase();
      lista = lista.filter(
        (b) =>
          b.titulo.toLowerCase().includes(q) ||
          extractExcerpt(b.descripcion).toLowerCase().includes(q)
      );
    }

    // Ordenamiento (Asumiremos que default es el orden original que suele ser el más reciente)
    if (sort === 'name-asc') lista.sort((a, b) => a.titulo.localeCompare(b.titulo));

    return lista;
  }, [blogs, categoriaActiva, search, sort]);

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
                placeholder="Buscar artículos..."
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
                  <span>Todos ({blogs.length})</span>
                </button>
              </li>
              {categorias.map((cat) => {
                const count = blogs.filter((b) => b.categoria_blog?.nombre === cat.nombre).length;
                const isActive = categoriaActiva === cat.nombre;
                return (
                  <li key={cat.nombre}>
                    <button
                      className={`${styles.filterItem} ${isActive ? styles.filterItemActive : ''}`}
                      onClick={() => setCategoriaActiva(isActive ? null : cat.nombre)}
                    >
                      <span className={`${styles.filterDot} ${isActive ? styles.filterDotActive : ''}`} />
                      <span>{cat.nombre} ({count})</span>
                    </button>
                  </li>
                );
              })}
            </ul>
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
          {(categoriaActiva || search || sort !== 'default') && (
            <button
              className={styles.clearBtn}
              onClick={() => {
                setCategoriaActiva(null);
                setSearch('');
                setSort('default');
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
          {blogsFiltrados.length} {blogsFiltrados.length === 1 ? 'artículo' : 'artículos'}
          {categoriaActiva && ` en ${categoriaActiva}`}
        </p>

        {blogsFiltrados.length === 0 ? (
          <div className={styles.empty}>
            <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--rose-pale)' }}>
              search_off
            </span>
            <p>No encontramos artículos con esos filtros.</p>
            <button
              className={styles.clearBtn}
              onClick={() => {
                setCategoriaActiva(null);
                setSearch('');
                setSort('default');
              }}
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {blogsFiltrados.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blog/${blog.slug}`}
                className={styles.card}
              >
                <div className={styles.cardImgWrap}>
                  <img
                    className={styles.cardImg}
                    alt={blog.titulo}
                    src={getStrapiImageUrl(blog.imagen_principal.url)}
                  />
                  {blog.categoria_blog && (
                    <div className={styles.categoryTag}>{blog.categoria_blog.nombre}</div>
                  )}
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{blog.titulo}</h3>
                  <p className={styles.cardDesc}>{extractExcerpt(blog.descripcion)}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.readMore}>Leer artículo</span>
                    <span className={`material-symbols-outlined ${styles.arrowIcon}`}>arrow_forward</span>
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

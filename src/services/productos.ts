import { query } from './strapi';
import type { Producto, ProductosResponse } from '@/types/producto';

export interface Categoria {
  nombre: string;
  slug: string;
}

interface CategoriasResponse {
  data: {
    categorias: Categoria[];
  };
}

const PRODUCTOS_QUERY = `
  query Productos {
    productos {
      activo
      descripcion_corta
      descripcion_larga
      imagen_principal {
        url
      }
      nombre
      precio_base
      imagenes {
        url
        size
      }
      stock
      precio_descuento
      producto_principal
      locale
      slug
      categoria_producto {
        nombre
        slug
      }
    }
  }
`;

const PRODUCTO_BY_SLUG_QUERY = `
  query ProductoBySlug($slug: String!) {
    productos(filters: { slug: { eq: $slug } }) {
      activo
      descripcion_corta
      descripcion_larga
      imagen_principal {
        url
      }
      nombre
      precio_base
      imagenes {
        url
        size
      }
      stock
      precio_descuento
      producto_principal
      locale
      slug
      categoria_producto {
        nombre
        slug
      }
    }
  }
`;

const CATEGORIAS_QUERY = `
  query Categorias {
    categorias {
      nombre
      slug
    }
  }
`;

/**
 * Obtiene todas las categorias disponibles.
 */
export async function getCategorias(): Promise<Categoria[]> {
  const res = await query<CategoriasResponse>(CATEGORIAS_QUERY);
  return res.data.categorias;
}

/**
 * Obtiene todos los productos activos de Strapi.
 */
export async function getProductos(): Promise<Producto[]> {
  const res = await query<ProductosResponse>(PRODUCTOS_QUERY);
  return res.data.productos.filter((p) => p.activo);
}

/**
 * Obtiene solo los productos marcados como "producto_principal".
 * Usados en la sección de destacados del home.
 */
export async function getProductosPrincipales(): Promise<Producto[]> {
  const todos = await getProductos();
  return todos.filter((p) => p.producto_principal);
}

/**
 * Obtiene un producto específico por su slug.
 */
export async function getProductoBySlug(slug: string): Promise<Producto | null> {
  const res = await query<ProductosResponse>(PRODUCTO_BY_SLUG_QUERY, { slug });
  const producto = res.data.productos[0];
  
  if (!producto || !producto.activo) return null;
  return producto;
}

/**
 * Construye la URL pública completa de una imagen de Strapi.
 */
export function getStrapiImageUrl(url: string): string {
  const base = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
  if (url.startsWith('http')) return url;
  return `${base}${url}`;
}

export function formatPrice(price: number): string {
  // Multiplicamos por 1000 ya que en Strapi se está guardando como "80.5" para referirse a 80.500 COP
  const priceInCOP = price * 1000;
  
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(priceInCOP);
}

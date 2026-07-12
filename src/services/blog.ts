import { query } from './strapi';
import type { Blog, BlogsResponse, CategoriaBlog, CategoriaBlogsResponse } from '@/types/blog';

const BLOGS_QUERY = `
  query Blogs {
    blogs {
      titulo
      slug
      descripcion
      categoria_blog {
        nombre
      }
      imagen_principal {
        url
      }
      imagenes_secundarias {
        url
      }
    }
  }
`;

const BLOG_BY_SLUG_QUERY = `
  query BlogBySlug($slug: String!) {
    blogs(filters: { slug: { eq: $slug } }) {
      titulo
      slug
      descripcion
      categoria_blog {
        nombre
      }
      imagen_principal {
        url
      }
      imagenes_secundarias {
        url
      }
    }
  }
`;

const CATEGORIAS_BLOG_QUERY = `
  query CategoriaBlogs {
    categoriaBlogs {
      nombre
    }
  }
`;

/**
 * Obtiene todos los artículos del blog
 */
export async function getBlogs(): Promise<Blog[]> {
  const res = await query<BlogsResponse>(BLOGS_QUERY);
  return res.data.blogs;
}

/**
 * Obtiene un artículo específico por su slug
 */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const res = await query<BlogsResponse>(BLOG_BY_SLUG_QUERY, { slug });
  const blog = res.data.blogs[0];
  
  if (!blog) return null;
  return blog;
}

/**
 * Obtiene las categorías de blog disponibles
 */
export async function getCategoriasBlog(): Promise<CategoriaBlog[]> {
  const res = await query<CategoriaBlogsResponse>(CATEGORIAS_BLOG_QUERY);
  return res.data.categoriaBlogs;
}

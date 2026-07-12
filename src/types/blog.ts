import type { RichTextBlock } from './producto';

export interface CategoriaBlog {
  nombre: string;
}

export interface ImagenBlog {
  url: string;
}

export interface Blog {
  titulo: string;
  slug: string;
  descripcion: RichTextBlock[];
  categoria_blog?: CategoriaBlog;
  imagen_principal: ImagenBlog;
  imagenes_secundarias?: ImagenBlog[];
}

export interface BlogsResponse {
  data: {
    blogs: Blog[];
  };
}

export interface CategoriaBlogsResponse {
  data: {
    categoriaBlogs: CategoriaBlog[];
  };
}

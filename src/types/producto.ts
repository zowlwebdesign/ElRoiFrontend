export interface CategoriaProducto {
  nombre: string;
  slug: string;
}

export interface ImagenProducto {
  url: string;
  size?: number;
}

export interface RichTextChild {
  type: string;
  text: string;
}

export interface RichTextBlock {
  type: string;
  children: RichTextChild[];
}

export interface Producto {
  activo: boolean;
  descripcion_corta: string;
  descripcion_larga: RichTextBlock[];
  imagen_principal: ImagenProducto;
  nombre: string;
  precio_base: number;
  imagenes: ImagenProducto[];
  stock: number;
  precio_descuento: number | null;
  producto_principal: boolean;
  locale: string;
  slug: string;
  categoria_producto: CategoriaProducto;
}

export interface ProductosResponse {
  data: {
    productos: Producto[];
  };
}

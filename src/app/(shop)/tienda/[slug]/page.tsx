import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { getProductoBySlug, getStrapiImageUrl, formatPrice } from '@/services/productos';
import type { RichTextBlock } from '@/types/producto';
import AddToCartBtn from '@/components/cart/AddToCartBtn';

export const revalidate = 60;

// Helper para renderizar los bloques de texto de Strapi (muy básico para párrafos)
function renderRichText(blocks: RichTextBlock[]) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return blocks.map((block, i) => {
    if (block.type === 'paragraph') {
      return (
        <p key={i}>
          {block.children?.map((child, j) => (
            <span key={j}>{child.text}</span>
          ))}
        </p>
      );
    }
    return null;
  });
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const producto = await getProductoBySlug(resolvedParams.slug);

  if (!producto) {
    notFound(); // Si el producto no existe o no está activo, retornamos un 404
  }

  // Preparamos las imágenes
  const mainImageUrl = getStrapiImageUrl(producto.imagen_principal.url);
  const galleryImages = [
    producto.imagen_principal,
    ...(producto.imagenes || []),
  ].map((img) => getStrapiImageUrl(img.url));

  return (
    <main className={`${styles.main} container-max padding-mobile padding-desktop`}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/tienda" className={styles.backLink}>
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Volver a Tienda
        </Link>
      </nav>

      <div className={styles.grid}>
        {/* Left Panel: Product Imagery */}
        <div className={styles.leftPanel}>
          <div className={`${styles.mainImageWrap} deckle-edge paper-shadow`}>
            <img
              className={styles.mainImage}
              alt={producto.nombre}
              src={mainImageUrl}
            />
            <div className={styles.tagOverlay}>
              <span className={styles.tagBrand}>EL ROI</span>
              {producto.categoria_producto && (
                <span className={styles.tagCollection}>
                  Colección<br />{producto.categoria_producto.nombre}
                </span>
              )}
            </div>
          </div>

          {galleryImages.length > 1 && (
            <div className={styles.thumbnails}>
              {galleryImages.slice(0, 3).map((url, idx) => (
                <button key={idx} className={`${styles.thumbnailBtn} ${idx === 0 ? styles.thumbnailBtnActive : ''}`}>
                  <img className={styles.thumbnailImg} alt={`Detail ${idx + 1}`} src={url} />
                </button>
              ))}
              {galleryImages.length > 3 && (
                <button className={`${styles.thumbnailBtn} ${styles.moreThumbnails}`}>
                  +{galleryImages.length - 3}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right Panel: Product Info */}
        <div className={`${styles.rightPanel} paper-shadow`}>
          <div className={styles.productEyebrow}>
            <div className={styles.eyebrowDot}></div>
            <span className={styles.eyebrowText}>
              {producto.categoria_producto ? producto.categoria_producto.nombre : 'El Dios que me ve'}
            </span>
          </div>
          <h1 className={styles.productTitle}>{producto.nombre}</h1>
          <p className={styles.productPrice}>
            {producto.precio_descuento ? (
              <>
                <span style={{ textDecoration: 'line-through', opacity: 0.5, marginRight: '0.5rem' }}>
                  {formatPrice(producto.precio_base)}
                </span>
                {formatPrice(producto.precio_descuento)} COP
              </>
            ) : (
              `${formatPrice(producto.precio_base)} COP`
            )}
          </p>

          <div className={styles.productDesc}>
            <p style={{ fontWeight: 'bold' }}>{producto.descripcion_corta}</p>
            {renderRichText(producto.descripcion_larga)}
          </div>

          <hr className={styles.divider} />

          {/* Ocultamos temporalmente tallas y colores hasta que Strapi lo soporte o sea necesario
          <div>
            <div className={styles.selectorLabel}>
              <span>Talla</span>
              <span className={styles.sizeGuide}>Guía de tallas</span>
            </div>
            <div className={styles.sizeGrid}>
              <button className={styles.sizeBtn}>S</button>
              <button className={`${styles.sizeBtn} ${styles.sizeBtnActive}`}>M</button>
              <button className={styles.sizeBtn}>L</button>
              <button className={`${styles.sizeBtn} ${styles.sizeBtnDisabled}`} disabled>XL</button>
            </div>
          </div>

          <div className={styles.colorWrap}>
            <span className={styles.colorLabel}>Color: Arena del Desierto</span>
            <div className={styles.colorGroup}>
              <button className={`${styles.colorBtn} ${styles.colorBtnActive}`} style={{backgroundColor: '#d5cfc4'}} aria-label="Arena del Desierto"></button>
              <button className={styles.colorBtn} style={{backgroundColor: '#2a2d34'}} aria-label="Noche Estrellada"></button>
              <button className={styles.colorBtn} style={{backgroundColor: '#8c9485'}} aria-label="Olivo"></button>
            </div>
          </div>
          */}

          <div style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--ink-soft)' }}>
            {producto.stock > 0 ? (
              <span style={{ color: 'var(--sage)' }}>En stock ({producto.stock} disponibles)</span>
            ) : (
              <span style={{ color: 'var(--rose)' }}>Agotado</span>
            )}
          </div>

          <AddToCartBtn 
            slug={producto.slug}
            nombre={producto.nombre}
            precio={(producto.precio_descuento || producto.precio_base) * 1000}
            imagen={producto.imagen_principal.url}
            stock={producto.stock}
            className={styles.addToCart}
          />

          <div className={styles.shippingInfo}>
            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
            <span className={styles.shippingText}>Envío gratuito en pedidos sobre $150</span>
          </div>
        </div>
      </div>
    </main>
  );
}

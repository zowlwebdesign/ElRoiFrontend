import Link from 'next/link';
import styles from './page.module.css';
import ParallaxImage from '@/components/ParallaxImage';
import { getProductosPrincipales, getStrapiImageUrl, formatPrice } from '@/services/productos';

export const revalidate = 60;

export default async function Home() {
  const productosPrincipales = await getProductosPrincipales();
  return (
    <main className={styles.main}>

      {/* ─── HERO FULL-BLEED ─── */}
      <section className={styles.hero}>
        {/* Parallax background image */}
        <div className={styles.heroBg}>
          <ParallaxImage
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjV8G5yngSmWKZdPooqvhJZ8gQb31qGuf3HrVH203UT31KoUueAk0BLcQabCkFRzcc6ZzmQyTR5EYJf-40EBKh74jYz-at9N-N7CaZ3Zsh_rB1OdoJC6m8zJPtQB-YeXZcZwEBov4b_3Zf0FcgeqXnXgE87doOIPJtlfkbbeuzjmGdx8qyfZGJRBJo7HoC-p-__AOGBiYZDkx7300rfJkJRQKbQBDZy1kY429xiC4RMa63gyWZWWkQPCwqoNTQkNbeg2Cp__9z4QY"
            alt="El Roi Paisaje"
            className={styles.heroBgImg}
            scale={1.5}
            orientation="down"
            delay={0.4}
            transition="cubic-bezier(0,0,0,1)"
          />
        </div>

        {/* Dark gradient veil */}
        <div className={styles.heroVeil} />

        {/* Noise texture overlay */}
        <div className={styles.heroNoise} />

        {/* Hero content */}
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Nueva Colección · 2025</p>
          <h1 className={styles.heroTitle}>
            El Dios<br />
            <span className={styles.heroTitleAccent}>que te ve</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Prendas tejidas con intención. Diseñadas para quienes buscan vestir más que ropa.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/tienda" className={styles.ctaPrimary}>
              Explorar Colección
            </Link>
            <Link href="/sobre-nosotros" className={styles.ctaSecondary}>
              Nuestra Historia
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollHint}>
          <div className={styles.scrollLine} />
          <span className={styles.scrollLabel}>scroll</span>
        </div>
      </section>

      {/* ─── MANIFESTO STRIP ─── */}
      <section className={styles.manifesto}>
        <div className={styles.manifestoInner}>
          <span className={styles.manifestoTag}>/ El Roi Significa /</span>
          <p className={styles.manifestoText}>
            "El Dios que me ve" — ropa que lleva historia, fe y propósito en cada hilo.
          </p>
        </div>
      </section>

      {/* ─── BENTO SPLIT PARALLAX ─── */}
      <section className={styles.split}>
        <div className={styles.splitImgWrap}>
          <ParallaxImage
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW9sn4IgW-evqFz78dwo98ZsbcEg9pOkmNXWfADrxFpkmKErH0UWbLgXAwRXxyNfoTeYcEkSC6qDNluZUm2WKzAzA_eSODqW2-TlQaILjfU_uXwcacXm4PUEL-LUsuX4gXs_ejDsQopGYZf-4RPk_AWOX2N39C0TF5CBtgr5iwo9Uk-KI2WvEXG7WDFEqLFLR8umlPf0f9R-3XemAbRr57kuqqW6QB4h6nm1SiN22Dg4D3Qul7A4NsDCZ2EToelJNQbuksD304Nfw"
            alt="Camiseta Gracia"
            className={styles.splitImg}
            scale={1.25}
            orientation="up"
            delay={0.3}
          />
        </div>
        <div className={styles.splitBody}>
          <span className={styles.splitTag}>Prenda Destacada</span>
          <h2 className={styles.splitTitle}>Camiseta Gracia</h2>
          <p className={styles.splitDesc}>
            Algodón orgánico de peso medio. Silueta estructurada. Bordado en arameo con el nombre de Dios en tu pecho.
          </p>
          <div className={styles.splitMeta}>
            <span className={styles.splitPrice}>$45.00</span>
            <Link href="/tienda/camiseta-gracia" className={styles.splitCta}>
              Comprar ahora →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── GRID PRODUCTOS PRINCIPALES ─── */}
      <section className={`${styles.productsSection} container-max padding-mobile padding-desktop`}>
        <div className={styles.productsHeader}>
          <h2 className={styles.sectionTitle}>La Colección</h2>
          <Link href="/tienda" className={styles.viewAll}>Ver Todo →</Link>
        </div>
        <div className={styles.productsGrid}>
          {productosPrincipales.map((producto) => (
            <Link
              key={producto.slug}
              href={`/tienda/${producto.slug}`}
              className={`${styles.productCard} paper-shadow`}
            >
              <div className={styles.productImgContainer}>
                <ParallaxImage
                  className={styles.productImg}
                  alt={producto.nombre}
                  src={getStrapiImageUrl(producto.imagen_principal.url)}
                  scale={1.15}
                  orientation="up"
                />
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productTitle}>{producto.nombre}</h3>
                <p className={styles.productPrice}>
                  {producto.precio_descuento
                    ? formatPrice(producto.precio_descuento)
                    : formatPrice(producto.precio_base)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FULL-WIDTH CTA BANNER ─── */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBannerBg}>
          <ParallaxImage
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM4gdfqtZh-XvpRR1bM-f3PHL2BM0tXkRfn87UUCk5ay1o5J33zFroD1SfqsbYi9dO1B4FeKkPbu5Dc2GpcFaFMM-pjjDhHpbBMTAdlIotVDVrSQ0x6YBarg8w0DWxkikSjw2uVuxa0Q5xT7NS-RQnC6HHL1u6d-p3CVUIwEgRatVz0OLjNgLB9NUxGHDWQB4-1J4iYRVlQxoZ6iEXDbrPsQnWBHYznN-eO0RGpJLCT04jCv6Lm-K_RRPa8S2NuIL36RFrdNb8QGE"
            alt="Tejido fondo"
            className={styles.ctaBannerImg}
            scale={1.4}
            orientation="up"
            delay={0.5}
          />
        </div>
        <div className={styles.ctaBannerVeil} />
        <div className={styles.ctaBannerContent}>
          <span className={styles.ctaBannerTag}>/ Diseño con Propósito /</span>
          <h2 className={styles.ctaBannerTitle}>
            Viste tu fe.<br />Lleva un recordatorio.
          </h2>
          <p className={styles.ctaBannerSub}>
            Envío gratuito en pedidos superiores a $80. Materiales orgánicos certificados.
          </p>
          <Link href="/tienda" className={styles.ctaBannerBtn}>
            Ver la Colección Completa
          </Link>
        </div>
      </section>

      {/* ─── NARRATIVE ─── */}
      <section className={`${styles.narrativeSection} container-max padding-mobile padding-desktop`}>
        <div className={styles.narrativeInner}>
          <div className={styles.narrativeText}>
            <div className={styles.narrativeLabel}>
              <div className={styles.narrativeDot} />
              <h2 className={styles.narrativeEyebrow}>Nuestra Historia</h2>
            </div>
            <h3 className={styles.narrativeHeading}>Tejiendo Fe en Cada Hilo</h3>
            <p className={styles.narrativeBody}>
              Nacimos de la convicción de que la ropa puede ser un recordatorio tangible de la presencia divina. "El Roi" significa "El Dios que me ve". Cada prenda que diseñamos es un lienzo sagrado.
            </p>
            <Link href="/sobre-nosotros" className={styles.narrativeBtn}>
              Conoce Más
            </Link>
          </div>
          <div className={styles.narrativeImgContainer}>
            <ParallaxImage
              className={styles.narrativeImg}
              alt="Manos trabajando tela"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM4gdfqtZh-XvpRR1bM-f3PHL2BM0tXkRfn87UUCk5ay1o5J33zFroD1SfqsbYi9dO1B4FeKkPbu5Dc2GpcFaFMM-pjjDhHpbBMTAdlIotVDVrSQ0x6YBarg8w0DWxkikSjw2uVuxa0Q5xT7NS-RQnC6HHL1u6d-p3CVUIwEgRatVz0OLjNgLB9NUxGHDWQB4-1J4iYRVlQxoZ6iEXDbrPsQnWBHYznN-eO0RGpJLCT04jCv6Lm-K_RRPa8S2NuIL36RFrdNb8QGE"
              scale={1.2}
              orientation="up"
            />
          </div>
        </div>
      </section>

    </main>
  );
}

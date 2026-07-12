'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { ShoppingBag, ChevronDown } from 'lucide-react';
import styles from './Navbar.module.css';
import type { Categoria } from '@/services/productos';
import CartDrawer from '@/components/cart/CartDrawer';
import { useCartStore } from '@/store/cartStore';

interface NavbarProps {
  categorias: Categoria[];
}

export default function Navbar({ categorias }: NavbarProps) {
  const pathname = usePathname();
  const [tiendaOpen, setTiendaOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cierra al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setTiendaOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cierra al cambiar de página
  useEffect(() => {
    setTiendaOpen(false);
  }, [pathname]);

  return (
    <nav className={styles.nav}>
      <div className={`${styles.inner} container-max padding-mobile padding-desktop`}>
        {/* Brand */}
        <div className={styles.brandArea}>
          <div className={styles.dots}>
            <div className={`${styles.dot} ${styles.dotWhite} color-dot-hover`} title="Pureza" />
            <div className={`${styles.dot} ${styles.dotPrimary} color-dot-hover`} title="Tierra" />
            <div className={`${styles.dot} ${styles.dotSecondary} color-dot-hover`} title="Cielo" />
          </div>
          <Link href="/" className={styles.brandText}>EL ROI</Link>
        </div>

        {/* Links */}
        <div className={styles.links}>
          <Link href="/" className={`${styles.link} ${pathname === '/' ? styles.linkActive : ''}`}>
            Inicio
          </Link>

          {/* Tienda con dropdown */}
          <div className={styles.dropdownWrap} ref={dropdownRef}>
            <button
              className={`${styles.link} ${styles.dropdownTrigger} ${pathname.startsWith('/tienda') ? styles.linkActive : ''}`}
              onClick={() => setTiendaOpen((v) => !v)}
              aria-expanded={tiendaOpen}
              aria-haspopup="true"
            >
              Tienda
              <ChevronDown
                size={14}
                strokeWidth={1.5}
                className={`${styles.chevron} ${tiendaOpen ? styles.chevronOpen : ''}`}
              />
            </button>

            <div className={`${styles.dropdown} ${tiendaOpen ? styles.dropdownOpen : ''}`}>
              <div className={styles.dropdownInner}>
                <Link href="/tienda" className={styles.dropdownAll}>
                  <span className={styles.dropdownAllLabel}>Ver todo</span>
                  <span className={styles.dropdownAllArrow}>→</span>
                </Link>
                <div className={styles.dropdownDivider} />
                <div className={styles.dropdownCategories}>
                  {categorias.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/tienda?categoria=${cat.slug}`}
                      className={styles.dropdownItem}
                    >
                      <span className={styles.dropdownDot} />
                      {cat.nombre}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/sobre-nosotros"
            className={`${styles.link} ${pathname === '/sobre-nosotros' ? styles.linkActive : ''}`}
          >
            Nuestra Visión
          </Link>
          <Link
            href="/blog"
            className={`${styles.link} ${pathname.startsWith('/blog') ? styles.linkActive : ''}`}
          >
            Blog
          </Link>
          <Link
            href="/contacto"
            className={`${styles.link} ${pathname === '/contacto' ? styles.linkActive : ''}`}
          >
            Contacto
          </Link>
          <Link
            href="/arameo"
            className={`${styles.link} ${pathname === '/arameo' ? styles.linkActive : ''}`}
          >
            Personalización
          </Link>
        </div>

        {/* Icons */}
        <div className={styles.icons}>
          <div className={styles.iconBtnWrap}>
            <button 
              aria-label="Carrito" 
              className={styles.iconBtn}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
            </button>
            {mounted && totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </div>
        </div>
      </div>

      <CartDrawer 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
      />
    </nav>
  );
}

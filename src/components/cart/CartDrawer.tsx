'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import styles from './CartDrawer.module.css';
import { useCartStore } from '@/store/cartStore';
import { getStrapiImageUrl } from '@/services/productos';
import { openWhatsAppCheckout } from '@/utils/whatsapp';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  // Previene hydration errors (Zustand persist on first render)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Bloquea el scroll cuando el carrito está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!mounted) return null;

  const total = getTotalPrice();

  return (
    <>
      {/* Overlay */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`} 
        onClick={onClose} 
      />

      {/* Drawer */}
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <ShoppingBag size={20} />
            <h2>Tu Pedido</h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.content}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <ShoppingBag size={48} className={styles.emptyIcon} />
              <p>Tu carrito está vacío.</p>
              <button className={styles.continueBtn} onClick={onClose}>
                Continuar explorando
              </button>
            </div>
          ) : (
            <div className={styles.itemsList}>
              {items.map((item) => (
                <div key={item.slug} className={styles.item}>
                  <div className={styles.itemImgWrap}>
                    <img 
                      src={getStrapiImageUrl(item.imagen)} 
                      alt={item.nombre} 
                      className={styles.itemImg} 
                    />
                  </div>
                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemName}>{item.nombre}</h3>
                    <p className={styles.itemPrice}>
                      $ {(item.precio).toLocaleString('es-CO')}
                    </p>
                    
                    <div className={styles.itemActions}>
                      <div className={styles.quantityControl}>
                        <button 
                          className={styles.qtyBtn} 
                          onClick={() => updateQuantity(item.slug, -1)}
                          disabled={item.cantidad <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className={styles.qtySpan}>{item.cantidad}</span>
                        <button 
                          className={styles.qtyBtn} 
                          onClick={() => updateQuantity(item.slug, 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        className={styles.removeBtn}
                        onClick={() => removeItem(item.slug)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span className={styles.totalPrice}>$ {total.toLocaleString('es-CO')} COP</span>
            </div>
            <p className={styles.shippingNotice}>
              El costo de envío se calculará durante la gestión por WhatsApp.
            </p>
            <button 
              className={styles.checkoutBtn} 
              onClick={() => openWhatsAppCheckout(items, total)}
            >
              Comprar por WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}

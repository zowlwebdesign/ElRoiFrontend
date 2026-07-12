'use client';

import { useCartStore } from '@/store/cartStore';

interface AddToCartBtnProps {
  slug: string;
  nombre: string;
  precio: number;
  imagen: string;
  stock: number;
  className?: string;
}

export default function AddToCartBtn({
  slug,
  nombre,
  precio,
  imagen,
  stock,
  className = '',
}: AddToCartBtnProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    if (stock > 0) {
      addItem({
        slug,
        nombre,
        precio,
        imagen,
      });
    }
  };

  return (
    <button 
      className={className} 
      disabled={stock === 0} 
      style={{ opacity: stock === 0 ? 0.5 : 1 }}
      onClick={handleAdd}
    >
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
        shopping_bag
      </span>
      {stock > 0 ? 'Añadir al Carrito' : 'Sin existencias'}
    </button>
  );
}

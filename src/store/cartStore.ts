import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  slug: string;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'cantidad'>) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, delta: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.slug === newItem.slug);
          if (existingItem) {
            // Incrementa la cantidad si ya existe
            return {
              items: state.items.map((item) =>
                item.slug === newItem.slug
                  ? { ...item, cantidad: item.cantidad + 1 }
                  : item
              ),
            };
          }
          // Añade como nuevo ítem
          return { items: [...state.items, { ...newItem, cantidad: 1 }] };
        });
      },

      removeItem: (slug) => {
        set((state) => ({
          items: state.items.filter((item) => item.slug !== slug),
        }));
      },

      updateQuantity: (slug, delta) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.slug === slug) {
              const newQuantity = item.cantidad + delta;
              // No permite que baje de 1 (para eliminar usar removeItem)
              return { ...item, cantidad: Math.max(1, newQuantity) };
            }
            return item;
          }),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.cantidad, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
      }
    }),
    {
      name: 'elroi-cart-storage', // Nombre para el localStorage
    }
  )
);

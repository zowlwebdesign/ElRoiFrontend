import { CartItem } from '@/store/cartStore';

const WHATSAPP_NUMBER = '57302438046';

export function formatPriceForMessage(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(price);
}

export function generateWhatsAppMessage(items: CartItem[], total: number): string {
  let message = 'Hola, me gustaría realizar el siguiente pedido:\n\nDetalle del pedido:\n';
  
  items.forEach(item => {
    message += `- ${item.cantidad}x ${item.nombre} (${formatPriceForMessage(item.precio * item.cantidad)})\n`;
  });
  
  message += `\nTotal a pagar: ${formatPriceForMessage(total)}\n\nQuedo a la espera de sus instrucciones para continuar con la gestión.`;
  
  return message;
}

export function openWhatsAppCheckout(items: CartItem[], total: number) {
  const message = generateWhatsAppMessage(items, total);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  window.open(url, '_blank');
}

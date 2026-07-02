import Link from 'next/link';

export default function Navbar() {
  return (
    <header style={{
      width: '100%',
      padding: '20px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ fontSize: '28px', fontWeight: 'bold', letterSpacing: '3px' }}>
        <Link href="/">EL ROÏ</Link>
      </div>
      
      <nav style={{ display: 'flex', gap: '30px', fontWeight: '500', fontSize: '16px' }}>
        <Link href="/" style={{ padding: '8px 0' }}>Inicio</Link>
        <Link href="/tienda" style={{ padding: '8px 0' }}>Productos</Link>
        <Link href="/blog" style={{ padding: '8px 0' }}>Blog</Link>
        <Link href="/sobre-nosotros" style={{ padding: '8px 0' }}>Nosotros</Link>
        <Link href="/contacto" style={{ padding: '8px 0' }}>Contacto</Link>
        <Link href="/arameo" style={{ padding: '8px 16px', backgroundColor: '#000', color: '#fff', borderRadius: '4px' }}>Arameo</Link>
      </nav>
    </header>
  );
}

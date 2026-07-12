import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getCategorias } from "@/services/productos";

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const categorias = await getCategorias();

  return (
    <>
      <Navbar categorias={categorias} />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
      <Footer />
    </>
  );
}

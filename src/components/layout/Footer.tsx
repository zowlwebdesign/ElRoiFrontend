import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container-max padding-mobile padding-desktop`}>
        <div className={styles.brand}>EL ROI</div>
        <div className={styles.links}>
          <Link href="/sustentabilidad" className={styles.link}>Sustentabilidad</Link>
          <Link href="/terminos" className={styles.link}>Términos</Link>
          <Link href="/privacidad" className={styles.link}>Privacidad</Link>
          <Link href="/contacto" className={styles.link}>Contacto</Link>
        </div>
        <div className={styles.copyright}>
          © 2024 EL ROI - Sacred Canvas. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

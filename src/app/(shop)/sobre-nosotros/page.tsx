import styles from './page.module.css';

export default function SobreNosotros() {
  return (
    <main className={`${styles.main} container-max padding-mobile padding-desktop relative z-20`}>
      {/* About Section Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Nuestra Historia</h1>
        <p className={styles.subtitle}>
          El Dios que me ve. Una mirada profunda a la inspiración detrás de Sacred Canvas.
        </p>
      </header>

      {/* Hagar Story Panel */}
      <section className={`${styles.storyPanel} deckle-edge paper-shadow`}>
        <div className={styles.storyGrid}>
          <div>
            <h2 className={styles.storyTitle}>Hagar (Agar)</h2>
            <h3 className={styles.storySubtitle}>El Origen de El Roi</h3>
            <p className={styles.storyText}>
              En el desierto, sola y desesperada, Hagar huyó. Fue allí, en el vacío, donde Dios la encontró. No con juicio, sino con provisión. Ella fue la primera persona en la historia bíblica en darle un nombre a Dios: <strong>"Tú eres el Dios que me ve" (El Roi)</strong>.
            </p>
            <p className={styles.storyQuote}>
              "¿No he visto yo aquí al que me ve?" - Génesis 16:13
            </p>
          </div>
          <div className={styles.storyImgWrap}>
            <img 
              className={styles.storyImg} 
              alt="Hagar in the desert" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgsB4mI9lBFqTvQlPmaGypOdkrYuCd6s2QT4y-FKurt-FTPRMMkINwIAtyx8mbtSSZO2L6D4fpqjB9IyYJP1c6AgG5XSUbFlcMU4iKaStCc7ltEVedvp9fC9m-oP8Idb1-lgIdcjV_jMrJcR192rocrCxcVnQIWZZKRAE-AdzaJv0RdRFIOpkEKuDuP9Y2jjcSOWRxfNfJtV7tKlRdcZkgSd1KIXCEguJJwVxdjoXYEPDmYVceoNP_fFLRaeYNqpYcqwsZZCfVMas" 
            />
          </div>
        </div>
      </section>

      {/* The Four Color Points (Bento Grid) */}
      <section className={styles.colorsSection}>
        <h2 className={styles.sectionTitle}>Nuestros Colores, Nuestro Mensaje</h2>
        <div className={styles.colorsGrid}>
          {/* Blanco */}
          <div className={styles.colorCard}>
            <div className={styles.colorHeader}>
              <div className={styles.colorDot} style={{backgroundColor: '#ffffff'}}></div>
              <h3 className={styles.colorTitle}>Pureza</h3>
            </div>
            <p className={styles.colorText}>Representa la limpieza espiritual y la intención honesta detrás de cada fibra que tejemos.</p>
          </div>
          
          {/* Amarillo / Oro */}
          <div className={styles.colorCard}>
            <div className={styles.colorHeader}>
              <div className={styles.colorDot} style={{backgroundColor: '#D4AF37'}}></div>
              <h3 className={styles.colorTitle}>Luz</h3>
            </div>
            <p className={styles.colorText}>La luz del mundo que ilumina nuestro camino y la esperanza que queremos reflejar.</p>
          </div>

          {/* Azul / Cielo */}
          <div className={styles.colorCard}>
            <div className={styles.colorHeader}>
              <div className={styles.colorDot} style={{backgroundColor: '#A8C3D1'}}></div>
              <h3 className={styles.colorTitle}>Verdad</h3>
            </div>
            <p className={styles.colorText}>Constancia, profundidad y la inmutabilidad de la palabra que guía nuestros diseños.</p>
          </div>

          {/* Naranja / Tierra */}
          <div className={styles.colorCard}>
            <div className={styles.colorHeader}>
              <div className={styles.colorDot} style={{backgroundColor: '#B4897C'}}></div>
              <h3 className={styles.colorTitle}>Tierra</h3>
            </div>
            <p className={styles.colorText}>Nuestras raíces humanas, moldeadas del barro pero llamadas a portar lo divino.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <h2 className={styles.sectionTitle}>El Equipo Detrás del Lienzo</h2>
        <div className={styles.teamGrid}>
          <div className={styles.teamMember}>
            <div className={styles.teamImgWrap}>
              <img className={styles.teamImg} alt="Mateo Silva" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApYyTLGUEm3Tu6xPGfWeJ1UjD2qgUPb8sYe_bjsRUP3rquQSSNKgUtCWw4sjGzJvKw8aPmA-umgH1yTR3xq3NnABSNeYD8nplFqYzJsfNau8h7FqHSp1cVs1BtpxdppsRnGvSwwZTepWIc3y548eUWYdiE_LsMNmYcbZLT2ycNbjNCy14NlT69q1cz65uhR7BWdf2hDDi0t7AzmeEAkpT0pxrQDBSSm6FfPDBRbL94_sIWeASZtU5m8u-mpw63fdm5T0j-xwbklLU" />
            </div>
            <h3 className={styles.teamName}>Mateo Silva</h3>
            <p className={styles.teamRole}>Fundador & Diseñador</p>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.teamImgWrap}>
              <img className={styles.teamImg} alt="Ana Reyes" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChy24JIhlz6MFEbTAhvJP_RjnTb45tdDMXSuD-uJOqQX3F2dxF47kM8-somnHScXtRzWmDj-Kj-Dii6AYRcvkXNiXVt5Jzf3CCEm8S7Sf6sb5v8E-fF8hPn8Fa0o7Mz4JuxKohtkmptsEgC_67RXHYN3akmS5PVi_n9SRv4wp1OFNkzDST6XAzyG5Kz1jkw8XpWQhitpmmGk2g-3PGzzu4OsLVxk44HOb_N2KmaMzPp2NRyDRUgTd6lgWtJgGlyuvoxEqKPdNpLBA" />
            </div>
            <h3 className={styles.teamName}>Ana Reyes</h3>
            <p className={styles.teamRole}>Directora Creativa</p>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.teamImgWrap}>
              <img className={styles.teamImg} alt="David León" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9VO37KBOvi5RpxxRi5xFiD2pnbNieCqdwGTk9ttt_lpjqwquixxoqgY2pTPLPMKidyQTs7zwKJW0gJYdJPACQRCbx05Nf3cohbvqWbUFMWLjPOM0lBA5cLRvbmkyYXOg3bTM3yT0p7LvgftXaKSH0alyta_a--jreMk5q_I5YoEM3HxXSueZOQWsozfVzvWG1BRWKC7ctd9PtYkPMNkltWqhVbc6kQlxRue6ufFHVBkbnd6QY5QXiXBQh7ZFDT6ZSuGO_xb5Omng" />
            </div>
            <h3 className={styles.teamName}>David León</h3>
            <p className={styles.teamRole}>Producción Textil</p>
          </div>
        </div>
      </section>
    </main>
  );
}

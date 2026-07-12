import styles from './page.module.css';

export default function Contacto() {
  return (
    <main className={`${styles.main} container-max padding-mobile padding-desktop`}>
      <div className={styles.grid}>
        
        {/* Contact Form (Paper Layer) */}
        <div className={`${styles.formPanel} deckle-edge paper-shadow`}>
          <h1 className={styles.title}>CONTACTO</h1>
          <p className={styles.subtitle}>
            Estamos aquí para ti. Comunícate con nosotros para preguntas sobre pedidos, textiles o nuestra visión compartida.
          </p>
          
          <form className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">Nombre</label>
              <input className={styles.input} id="name" placeholder="Tu nombre completo" type="text" />
            </div>
            
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input className={styles.input} id="email" placeholder="Tu correo electrónico" type="email" />
            </div>
            
            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">Mensaje</label>
              <textarea className={styles.textarea} id="message" placeholder="¿En qué te podemos ayudar?" rows={5}></textarea>
            </div>
            
            <button className={styles.submitBtn} type="submit">
              Enviar Mensaje
            </button>
          </form>
        </div>

        {/* Map and Info (Schematic Layer) */}
        <div className={styles.infoSide}>
          <div className={`${styles.mapWrap} paper-shadow`}>
            <div 
              className={styles.mapImg} 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9rtOe55j953YMotnOqWkAU6KC2Y9WOZvfh_OT-xxDfzRCcSXLdvty_c-FT2DwAS9O42BXgTEjN_zuadiOu7n5aA3GMxDmKQ3LfO6DTIj_PvKak-9D0uGgh5E1rYn3GcZWRR81hstducOvNuWbb8QM4YQE9DrrUFqtRknxfk5dabPYH1FpL5gHmCbXhpZHkph622cv26y-bXEz6nzD0z3qwSWBvHOpipNd7RM2KRCYEl0Bxl4s2TttCiAQsjhGHM0TaM0K912piyQ')" }}
            ></div>
            <div className={styles.pinOverlay}>
              <div className={styles.pin}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              </div>
            </div>
          </div>

          <div className={styles.infoBlocks}>
            <div>
              <h3 className={styles.blockTitle}>
                <span className={styles.blockDot}></span>
                Estudio
              </h3>
              <p className={styles.blockText}>
                123 Sacred Canvas Way<br />
                Design District<br />
                Los Angeles, CA 90013
              </p>
            </div>
            <div>
              <h3 className={styles.blockTitle}>
                <span className={styles.blockDot}></span>
                Directo
              </h3>
              <p className={styles.blockText}>
                hello@elroi.com<br />
                +1 (555) 019-2837
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

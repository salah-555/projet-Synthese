import React from 'react';
import Navbar from '../components/Navbar'
import styles from './styles/home.module.css';

const Index = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>
          <section className={styles.heroSection}>
            <h1 className={styles.heroTitle}>
              Bienvenue sur <span className={styles.highlight}>EcoSmart</span>
            </h1>
            <p className={styles.heroSubtitle}>
              La plateforme de gestion scolaire innovante et éco-responsable pour les écoles modernes
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;

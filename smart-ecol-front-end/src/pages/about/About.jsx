// src/pages/About.jsx
import React from 'react';
import styles from './About.module.css';
import Navbar from '../../components/Navbar';

const About = () => {
  const team = [
    {
      name: "Sophie Dubois",
      role: "Directrice",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      bio: "20 ans d'expérience dans l'éducation, passionnée par les approches pédagogiques innovantes.",
    },
    {
      name: "Thomas Martin",
      role: "Responsable Pédagogique",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      bio: "Expert en développement de programmes éducatifs axés sur les compétences du 21ème siècle.",
    },
    {
      name: "Marie Lefèvre",
      role: "Coordinatrice Numérique",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      bio: "Spécialiste en intégration technologique dans l'environnement scolaire.",
    },
  ];

  return (
    <div className={styles.aboutPage}>
      <Navbar />
      <main className={styles.mainContent}>
        <section className={styles.introSection}>
          <h1 className={styles.title}>À Propos <span className={styles.brandName}>d'EcoSmart</span></h1>
          <p className={styles.tagline}>
            Une plateforme de gestion scolaire qui allie technologie et respect de l'environnement pour une éducation moderne et responsable.
          </p>
        </section>

        <section className={styles.visionSection}>
          <img className={styles.visionImage} src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=60" alt="École innovante" />
          <div className={styles.visionText}>
            <h2 className={styles.subTitle}>Notre Vision</h2>
            <p>EcoSmart est né d'une vision simple : transformer l'expérience éducative à travers des outils numériques tout en promouvant des valeurs écologiques fortes.</p>
            <p>Notre mission est de fournir aux écoles une plateforme complète qui simplifie la gestion administrative, enrichit l'expérience d'apprentissage et sensibilise la communauté scolaire aux enjeux environnementaux.</p>
          </div>
        </section>

        <section className={styles.valuesSection}>
          <h2 className={styles.subTitle}>Nos Valeurs</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <span className={styles.icon}>💡</span>
              <h3>Innovation</h3>
              <p>Nous repoussons constamment les limites pour créer des solutions éducatives avant-gardistes.</p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.icon}>🌱</span>
              <h3>Durabilité</h3>
              <p>Chaque décision que nous prenons est guidée par un engagement profond envers la protection de notre planète.</p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.icon}>🤝</span>
              <h3>Communauté</h3>
              <p>Nous construisons des liens forts entre tous les acteurs de l'écosystème éducatif.</p>
            </div>
          </div>
        </section>

        <section className={styles.teamSection}>
          <h2 className={styles.subTitle}>Notre Équipe</h2>
          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <img className={styles.teamImage} src={member.image} alt={member.name} />
                <div className={styles.teamInfo}>
                  <h3>{member.name}</h3>
                  <p className={styles.role}>{member.role}</p>
                  <p>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;

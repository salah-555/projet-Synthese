import React from 'react';
import Navbar from '../../components/Navbar';
import styles from  './About.module.css';

const About = () => {
  // Team members data
  const team = [
    {
      name: "Sophie Dubois",
      role: "Directrice",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
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
    <div className={styles.aboutContainer}>
       <Navbar />
      <div className={styles.aboutContent}>
        <div className={styles.aboutImage}>
        <div className={styles.aboutMaxWidth}>
          <section className={styles.aboutsSectionAboutIntro}>
            <h1>
              À Propos <span>d'EcoSmart</span>
            </h1>
            <p>
              Une plateforme de gestion scolaire qui allie technologie et respect de l'environnement pour une éducation moderne et responsable.
            </p>
          </section>
          
          <div className={styles.aboutGridAboutVision}>
            <div className="about-image-container">
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=60" 
                alt="École innovante" 
              />
            </div>
            <div className={styles.aboutVisionText}>
              <h2>Notre Vision</h2>
              <p>
                EcoSmart est né d'une vision simple : transformer l'expérience éducative à travers des outils numériques tout en promouvant des valeurs écologiques fortes.
              </p>
              <p>
                Notre mission est de fournir aux écoles une plateforme complète qui simplifie la gestion administrative, enrichit l'expérience d'apprentissage et sensibilise la communauté scolaire aux enjeux environnementaux.
              </p>
            </div>
          </div>
          
          <section className={styles.aboutValues}>
            <h2>Nos Valeurs</h2>
            <div className={styles.aboutValuesGrid}>
              <div className={styles.aboutValueCard}>
                <div className={styles.aboutValueIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3>Innovation</h3>
                <p>
                  Nous repoussons constamment les limites pour créer des solutions éducatives avant-gardistes.
                </p>
              </div>
              
              <div className={styles.aboutValueCard}>
                <div className={styles.aboutValueIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3>Durabilité</h3>
                <p>
                  Chaque décision que nous prenons est guidée par un engagement profond envers la protection de notre planète.
                </p>
              </div>
              
              <div className={styles.aboutValueCard}>
                <div className="about-value-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <h3>Communauté</h3>
                <p>
                  Nous construisons des liens forts entre tous les acteurs de l'écosystème éducatif.
                </p>
              </div>
            </div>
          </section>
          
          <section className={styles.aboutTeam}>
            <h2>Notre Équipe</h2>
            <div className={styles.aboutTeamGrid}>
              {team.map((member, index) => (
                <div key={index} className={styles.aboutTeamMember}>
                  <div className={styles.aboutTeamImage}>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                    />
                  </div>
                  <div className={styles.aboutteamInfo}>
                    <h3>{member.name}</h3>
                    <p className={styles.aboutTeamRole}>{member.role}</p>
                    <p className={styles.aboutTeamBio}>{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
    </div>
)      
};

export default About;
import React from 'react';
import Navbar from '../../components/Navbar';
import styles from './cours.module.css';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "Mathématiques",
      level: "6ème",
      teacher: "Mme. Lambert",
      description: "Cours de mathématiques fondamentales pour les élèves de 6ème",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      title: "Français",
      level: "5ème",
      teacher: "M. Dubois",
      description: "Apprentissage de la grammaire, conjugaison et littérature française",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      title: "Sciences",
      level: "4ème",
      teacher: "Dr. Martin",
      description: "Introduction aux concepts scientifiques fondamentaux",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      title: "Histoire-Géographie",
      level: "3ème",
      teacher: "Mme. Petit",
      description: "Étude de l'histoire mondiale et de la géographie",
      image: "https://images.unsplash.com/photo-1447069387593-a5de0862481e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
  ];

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>
          <section className={styles.headerSection}>
            <h1 className={styles.title}>
              Nos <span className={styles.highlight}>Cours</span>
            </h1>
            <p className={styles.subtitle}>
              Découvrez notre sélection de cours conçus pour offrir une éducation moderne et adaptée aux besoins des élèves.
            </p>
          </section>

          <div className={styles.courseGrid}>
            {courses.map((course) => (
              <div key={course.id} className={styles.courseCard}>
                <div className={styles.courseImageContainer}>
                  <img src={course.image} alt={course.title} className={styles.courseImage} />
                </div>
                <div className={styles.courseContent}>
                  <div className={styles.courseHeader}>
                    <span className={styles.courseLevel}>{course.level}</span>
                    <span className={styles.courseTeacher}>{course.teacher}</span>
                  </div>
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  <p className={styles.courseDescription}>{course.description}</p>
                  <button className={styles.courseButton}>Voir le détail</button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.footerButtonContainer}>
            <button className={styles.viewAllButton}>Voir tous les cours disponibles</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;

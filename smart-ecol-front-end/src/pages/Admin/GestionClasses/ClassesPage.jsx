import React, { useState, useEffect } from 'react';
import { Trash2, Plus, UserPlus, X, Users, Sidebar} from 'lucide-react';
import styles from './classe.module.css';
import Navbar from '../../../components/Navbar';



const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [professeurs, setProfesseurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedClasse, setSelectedClasse] = useState(null);
  const [newClasse, setNewClasse] = useState({ name: '', niveau: '' });

// Ajoutez ces nouveaux états au début du composant
  const [showAssignStudentsModal, setShowAssignStudentsModal] = useState(false);
  const [unassignedStudents, setUnassignedStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Récupérer le token depuis localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // Headers pour les requêtes API
  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${getAuthToken()}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  // Charger les classes
  const fetchClasses = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/classes', {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) throw new Error('Erreur lors du chargement des classes');
      
      const data = await response.json();
      setClasses(data);
    } catch (err) {
      setError('Impossible de charger les classes');
      console.error("Erreur de chargement : ", err);
    }
  };

  // Charger les professeurs
  const fetchProfesseurs = async () => {
  try {
    // Option 1: Si vous utilisez la route /users avec paramètre
    const response = await fetch('http://localhost:8000/api/users?role=prof', {
      headers: getAuthHeaders()
    });
    
    // Option 2: Si vous créez une route spécifique /profs
    // const response = await fetch('http://localhost:8000/api/profs', {
    //   headers: getAuthHeaders()
    // });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Professeurs récupérés:', data); // Pour débugger
    setProfesseurs(data);
  } catch (err) {
    console.error('Erreur lors du chargement des professeurs:', err);
    setError('Impossible de charger les professeurs');
  }
};








  // Ajouter une nouvelle classe
  const handleAddClasse = async () => {
    if (!newClasse.name || !newClasse.niveau) {
      setError('Tous les champs sont requis');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/classes', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newClasse)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'ajout');
      }

      const newClasseData = await response.json();
      setClasses([...classes, newClasseData]);
      setNewClasse({ name: '', niveau: '' });
      setShowAddModal(false);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  // Supprimer une classe
  const handleDeleteClasse = async (classeId) => {
   if (!window.confirm('Suppression définitive ?')) return;

  try {
    const response = await fetch(`http://localhost:8000/api/classes/${classeId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    // Vérifiez spécifiquement le statut 401
    if (response.status === 401) {
      throw new Error('Session expirée');
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Échec de la suppression');
    }

    // Mise à jour optimiste sans rechargement complet
    setClasses(prev => prev.filter(c => c.id !== classeId));
    setError('');

  } catch (err) {
    if (err.message.includes('Session expirée')) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else {
      setError(err.message);
      await fetchClasses(); // Recharge silencieuse
    }
  }
  };

  // Assigner un professeur à une classe
  const handleAssignProf = async (profId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/classes/${selectedClasse.id}/assign-prof`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ prof_id: profId })
      });

      const result = await response.json();


      if (!response.ok) {
        throw new Error(result.message || 'Erreur lors de l\'assignation');
      } 

      // Si votre API retourne { success: true, data: classe }

      const updatedClasse = result.data || result;

      setClasses(classes.map(c => c.id === selectedClasse.id ? updatedClasse : c));
      setShowAssignModal(false);
      setSelectedClasse(null);
      setError(''); // Réinitialiser l'erreur
    } catch (err) {
      setError(`Impossible d'assigner le professeur: ${err.message}`);
      console.error(err);
    }
  };

  const handleAssignStudents = async () => {
    if(!selectedClasse || selectedStudents.length === 0) return;

    try {
      const response =  await fetch(`http://localhost:8000/api/classes/${selectedClasse.id}/assign-students`, {
        method: 'PUT',
        headers: getAuthHeaders(),
         body: JSON.stringify({
        // _method: 'PUT',
        student_ids: selectedStudents
    })
  });
  const data = await response.json();

      console.log(data);
      if(!response.ok) throw new Error("Erreur lors de l'assignation des eleves");

      setShowAssignStudentsModal(false);
      setSelectedStudents([]);
      await fetchClasses();
        
    } catch (err) {
      setError("Erreur assignation eleves : " +err.message);
    }
  };

//   const openAssignStudentsModal = async (classe) => {
//   setSelectedClasse(classe);
//   setShowAssignStudentsModal(true);

//   try {
//     const response = await fetch(`http://localhost:8000/api/classes/unassigned`, {
//       headers: getAuthHeaders()
//     });
//     const data = await response.json();
//     setUnassignedStudents(data);
//   } catch (err) {
//     setError("Impossible de charger les élèves non assignés", err.message);
//   }
// };

const openAssignStudentsModal = async (classe) => {
  // 1. On sauvegarde la classe sélectionnée dans l’état React
  setSelectedClasse(classe);

  // 2. On affiche la modale pour assigner les élèves
  setShowAssignStudentsModal(true);

  // 3. On tente de récupérer les élèves non encore assignés à une classe
  try {
    const response = await fetch(`http://localhost:8000/api/students/unassigned`, {
      headers: getAuthHeaders() // inclut par exemple le token Bearer pour l’authentification
    });
    const data = await response.json();

    // 4. On stocke la liste des élèves non assignés dans un state React
    setUnassignedStudents(data);
  } catch (err) {
    // 5. Si erreur, afficher un message d’erreur
    setError("Impossible de charger les élèves non assignés");
  }
};

  

  // Ajoutez ce useEffect pour debugger
    useEffect(() => {
      if (unassignedStudents.length > 0) {
        console.log('Unassigned students loaded:', unassignedStudents);
      }
    }, [unassignedStudents]);

  

 



  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchClasses(), fetchProfesseurs()]);
      setLoading(false);
    };
    
    loadData();
  }, []);

  if (loading) {
    return (  
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
         
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Chargement des classes...</p>
        </div>
      </div>

    );
  }

  return (
    
    <div className={styles.pageContainer}>
        <Navbar />
      <div className={styles.contentWrapper}>
        {/* Header */}
        
        <div className={styles.headerCard}>
          <div className={styles.headerContent}>
            <div className={styles.headerInfo}>
              <div>
                <h1 className={styles.pageTitle}>Gestion des Classes</h1>
                <p className={styles.pageSubtitle}>Gérez les classes de votre établissement</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className={styles.addButton}
              >
                <Plus size={20} />
                Ajouter une classe
              </button>
            </div>
          </div>
        </div>

        {/* Messages d'erreur */}
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {/* Tableau des classes */}
        <div className={styles.tableContainer}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={styles.tableHeaderCell}>Nom de la classe</th>
                  <th className={styles.tableHeaderCell}>Niveau</th>
                  <th className={styles.tableHeaderCell}>Professeur assigné</th>
                  <th className={styles.tableHeaderCellRight}>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {classes.length === 0 ? (
                  <tr>
                    <td colSpan="4" className={styles.emptyMessage}>
                      Aucune classe trouvée
                    </td>
                  </tr>
                ) : (
                  classes.map((classe) => (
                    <tr key={classe.id} className={styles.tableRow}>
                      <td className={styles.tableCell}>
                        <div className={styles.className}>{classe.name}</div>
                      </td>
                      <td className={styles.tableCell}>
                        <span className={styles.levelBadge}>
                          {classe.niveau}
                        </span>
                      </td>
                      <td className={styles.tableCell}>
                        <span className={styles.professorName}>
                          {classe.professeur ? classe.professeur.name : 'Non assigné'}
                        </span>
                      </td>
                      <td className={styles.tableCellRight}>
                        <div className={styles.actionButtons}>
                          <button
                            onClick={() => {
                              setSelectedClasse(classe);
                              setShowAssignModal(true);
                            }}
                            className={styles.assignButton}
                            title="Assigner un professeur"
                          >
                            <UserPlus size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClasse(classe.id)}
                            className={styles.deleteButton}
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                          <button
                            onClick={() => openAssignStudentsModal(classe)}
                            className={styles.assignButton}
                            title="Assigner des élèves"
                          >
                            <Users size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal d'ajout de classe */}
        {showAddModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>Ajouter une nouvelle classe</h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setNewClasse({ name: '', niveau: '' });
                    setError('');
                  }}
                  className={styles.closeButton}
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className={styles.modalContent}>
                <div className={styles.formGroup}>
                  <label htmlFor="className" className={styles.formLabel}>
                    Nom de la classe
                  </label>
                  <input
                    type="text"
                    id="className"
                    value={newClasse.name}
                    onChange={(e) => setNewClasse({ ...newClasse, name: e.target.value })}
                    className={styles.formInput}
                    placeholder="Ex: 6ème A, Terminal S1..."
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="niveau" className={styles.formLabel}>
                    Niveau
                  </label>
                  <input
                    type="text"
                    id="niveau"
                    value={newClasse.niveau}
                    onChange={(e) => setNewClasse({ ...newClasse, niveau: e.target.value })}
                    className={styles.formInput}
                    placeholder="Ex: 6ème, Terminal, CP..."
                  />
                </div>
                
                <div className={styles.modalActions}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setNewClasse({ name: '', niveau: '' });
                      setError('');
                    }}
                    className={styles.cancelButton}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={handleAddClasse}
                    className={styles.submitButton}
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal d'assignation de professeur */}
        {showAssignModal && selectedClasse && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal} style={{ width: '800px' }}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>
                  Assigner un professeur à {selectedClasse.name}
                </h3>
                 <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedClasse(null);
                    setError('');
                  }}
                  className={styles.closeButton}
                >
                  <X size={24} />
                </button>
              </div>

              <div className={styles.modalContent}>
                {professeurs.length === 0 ? (
                  <p className={styles.emptyMessage}>Aucun professeur disponible</p>
                ) : (
                  <ul className={styles.profList}>
                    {professeurs.map((prof) => (
                      <li key={prof.id} className={styles.profItem}>
                        <span>{prof.name}</span>
                        <button
                          onClick={() => handleAssignProf(prof.id)}
                          className={styles.assignButton}
                        >
                          Assigner
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
{showAssignStudentsModal && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <h3>Assigner des élèves à {selectedClasse?.name}</h3>
        <button onClick={() => setShowAssignStudentsModal(false)} className={styles.closeButton}>
          <X />
        </button>
      </div>
      <div className={styles.modalBody}>
        <ul className={styles.studentList}>
          {unassignedStudents.map((student) => (
            <li key={student.id}>
              <label>
                <input
                  type="checkbox"
                  value={student.id}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedStudents((prev) => [...prev, student.id]);
                    } else {
                      setSelectedStudents((prev) =>
                        prev.filter((id) => id !== student.id)
                      );
                    }
                  }}
                />
                {student.name}
              </label>
            </li>
          ))}
        </ul>
        <button onClick={handleAssignStudents} className={styles.saveButton}>
          Enregistrer
        </button>
      </div>
    </div>
  </div>
)}


      </div>
    </div>
  );
};


export default ClassesPage;
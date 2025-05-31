import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, X, Check, AlertCircle, ArrowRight} from 'lucide-react';
import styles from './matiere.module.css';
import Navbar from '../../../components/Navbar';
import SidebarComponent from '../SidebarComponent';
import { useNavigate } from 'react-router-dom';

const MatiereManagement = () => {
  const [matieres, setMatieres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMatiere, setEditingMatiere] = useState(null);
  const [formData, setFormData] = useState({ name: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // const [authToken, setAuthToken] = useState('demo-token-123'); // In-memory token storage
  const [authToken, setAuthToken] = useState('');
 
  // Simulated API base URL - replace with your actual API endpoint
useEffect(() => {
  const token = localStorage.getItem('token');
  console.log('Token récupéré depuis localStorage :', token);
  if (token) {
    setAuthToken(token);
    fetchMatieres(token);
  } else {
    setError("Aucun token trouvé. Veuillez vous reconnecter.");
  }
}, []);

  

  // Fetch all matieres
  const fetchMatieres = async (token) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:8000/api/matieres', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },

      });
      
      if(!response.ok) {
        const errorData = await response.json();
        console.error('Full API response :', errorData);
        throw new Error(errorData.message || 'Failed to fetch matieres');
      }
      
      const data = await response.json();
      setMatieres(data);
    } catch (err) {
      setError('Erreur lors du chargement des matières');
      console.error('Fetch error:', err);
      // For demo purposes, use mock data
      // setMatieres([
      //   { id: 1, name: 'Mathématiques', eleves: [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}], professeur: {id: 1, name: 'Dr. Smith'} },
      //   { id: 2, name: 'Français', eleves: [{id: 3, name: 'Alice'}], professeur: {id: 2, name: 'Mme. Dupont'} },
      //   { id: 3, name: 'Histoire', eleves: [], professeur: null }
      // ]);
    } finally {
      setLoading(false);
    }
  };

  // Create new matiere
  const createMatiere = async (data) => {
    try {
      const response = await fetch('http://localhost:8000/api/matieres', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create matiere');
      }

      const result = await response.json();
      setMatieres(prev => [...prev, result.data]);
      setSuccess('Matière ajoutée avec succès');
      setShowForm(false);
      setFormData({ name: '' });
    } catch (err) {
      setError(err.message || 'Erreur lors de la création');
    }
  };

  // Update matiere
  const updateMatiere = async (id, data) => {
    try {
      const response = await fetch(`http://localhost:8000/api/matieres/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update matiere');
      }

      const result = await response.json();
      setMatieres(prev => prev.map(m => m.id === id ? result.data : m));
      setSuccess('Matière modifiée avec succès');
      setEditingMatiere(null);
      setFormData({ name: '' });
    } catch (err) {
      setError(err.message || 'Erreur lors de la modification');
    }
  };

  // Delete matiere
  const deleteMatiere = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette matière ?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/matieres/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete matiere');
      }

      setMatieres(prev => prev.filter(m => m.id !== id));
      setSuccess('Matière supprimée avec succès');
    } catch (err) {
      setError(err.message || 'Erreur lors de la suppression');
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Le nom de la matière est requis');
      return;
    }

    if (editingMatiere) {
      updateMatiere(editingMatiere.id, formData);
    } else {
      createMatiere(formData);
    }
  };

  // Handle edit
  const handleEdit = (matiere) => {
    setEditingMatiere(matiere);
    setFormData({ name: matiere.name });
    setShowForm(true);
  };

  // Handle cancel
  const handleCancel = () => {
    setShowForm(false);
    setEditingMatiere(null);
    setFormData({ name: '' });
    setError('');
  };

  // Clear messages
  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  useEffect(() => {
    fetchMatieres();

  }, []);

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(clearMessages, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);




  const navigate = useNavigate();
  const goToDashboard = () => {
    navigate("/admin/dashboard");
  }

  return (
    <div className={styles.navigation}>
    <Navbar />
    <SidebarComponent />
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Gestion des Matières</h2>
        <button
          onClick={() => setShowForm(true)}
          className={styles.addButton}
        >
          <Plus size={20} />
          Ajouter une matière
        </button>
        <button
        onClick={() => {goToDashboard()}}
        className={styles.addButton}
      >
        <ArrowRight size={20} />
        Retour
      </button>
      </div>
      

      {/* Messages */}
      {error && (
        <div className={styles.errorMessage}>
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {success && (
        <div className={styles.successMessage}>
          <Check size={20} />
          {success}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {editingMatiere ? 'Modifier la matière' : 'Ajouter une matière'}
              </h3>
              <button
                onClick={handleCancel}
                className={styles.closeButton}
              >
                <X size={20} />
              </button>
            </div>

            <div>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Nom de la matière
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  className={styles.input}
                  placeholder="Entrez le nom de la matière"
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                />
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={handleCancel}
                  className={styles.cancelButton}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={styles.submitButton}
                >
                  {editingMatiere ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Matieres Table */}
      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Chargement...</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeaderRow}>
                <th className={styles.tableHeader}>
                  Nom de la matière
                </th>
                <th className={styles.tableHeader}>
                  Professeur
                </th>
                <th className={styles.tableHeader}>
                  Nombre d'élèves
                </th>
                <th className={styles.tableHeaderCenter}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {matieres.length === 0 ? (
                <tr>
                  <td colSpan="4" className={styles.noDataCell}>
                    Aucune matière trouvée
                  </td>
                </tr>
              ) : (
                matieres.map((matiere) => (
                  <tr key={matiere.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      {matiere.name}
                    </td>
                    <td className={styles.tableCell}>
                      {matiere.professeur ? matiere.professeur.name : 'Non assigné'}
                    </td>
                    <td className={styles.tableCell}>
                      {matiere.eleves ? matiere.eleves.length : 0}
                    </td>
                    <td className={styles.tableCellCenter}>
                      <div className={styles.actionButtons}>
                        <button
                          onClick={() => handleEdit(matiere)}
                          className={styles.editButton}
                          title="Modifier"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => deleteMatiere(matiere.id)}
                          className={styles.deleteButton}
                          title="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Stats Summary */}
      <div className={styles.statsContainer}>
        <h3 className={styles.statsTitle}>Résumé</h3>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{matieres.length}</div>
            <div className={styles.statLabel}>Total des matières</div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statNumber} ${styles.green}`}>
              {matieres.filter(m => m.professeur).length}
            </div>
            <div className={styles.statLabel}>Matières avec professeur</div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statNumber} ${styles.orange}`}>
              {matieres.reduce((acc, m) => acc + (m.eleves ? m.eleves.length : 0), 0)}
            </div>
            <div className={styles.statLabel}>Total des inscriptions</div>
          </div>
        </div>
      </div>
    </div>
 </div>
     );
};

export default MatiereManagement;
import React, {useEffect, useState} from 'react'
import styles from './classe.module.css'; 
import useApi from '../../../hooks/useApi';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ClassesPage = () => {
    const { get, post, del, put} = useApi();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [classes, setClasses] = useState([]);
    const [newClasse, setNewClasse] = useState({
        name: '',
        niveau: ''
    });

    useEffect(()=> {
        //Verifer si l'utilisateur est un admin
        if(user && user.role !== 'admin') {
            navigate('/login');
        }
    }, [user, navigate])

    const fetchClasses =  async () => {
        const data = await get('/classes');
        setClasses(data);
    };

    const addClasse = async () => {
        try{
            await post('/classes', newClasse);
            setNewClasse({name: '', niveau: ''});
            fetchClasses();
        } catch (error) {
            console.error("Erreur lors de l'ajout:", error.response?.data || error.message);
        }
    };

    const deleteClasse = async (id) => {
        await del(`/classes/${id}`);
        fetchClasses();
    };

    const assignProf = async (classeId) => {
        const profId = prompt ("Entrez l'ID du professeur à assigner :");
        if(profId) {
            await put(`/classes/${classeId}/assign-prof`, {prof_id: profId});
            fetchClasses();
        }
    };

    useEffect(() => {
        if (user) {
             fetchClasses();
        }
    }, [user]);

    if (!user) {
        return <p>Chargement...</p> // ou une animation de chargement 
    }
 

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Liste des classes</h2>

            <div className={styles.form}>
                <input 
                 className={styles.input}
                 placeholder='Nom de la classe'
                 value={newClasse.name}
                 onChange={(e) => setNewClasse({...newClasse, name: e.target.value})}
                />
                <input 
                 className={styles.input}
                 placeholder='Niveau de la classe'
                 value={newClasse.niveau}
                 onChange={(e) => setNewClasse({...newClasse, niveau: e.target.value})}
                />
                <button className={styles.addButton} onClick={addClasse}>
                    Ajouter
                </button>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nom de la classe</th>
                        <th>Niveau</th>
                        <th>Professeur</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((classe) => (
                        <tr key={classe.id} className={styles.row}>
                            <td>{classe.name}</td>
                            <td>{classe.niveau}</td>
                            <td>{classe.professeur_id || 'Non assigné'}</td>
                            <td className={styles.actions}>

                                <button className={styles.deleteButton} onClick={() => deleteClasse(classe.id)}>
                                    Supprimer
                                </button>

                                 <button className={styles.assignButton} onClick={() => assignProf(classe.id)}>
                                    Assigner Prof
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}
export default ClassesPage;
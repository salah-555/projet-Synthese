import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import InfoCard from './InfoCard';
import './css/dashboard.css';
import Navbar from '../../components/Navbar';


const AdminDasboard = () => {
  const navigate = useNavigate();
   const [loading, setLoading] = useState(true);  // pour le chargement initial
  const [stats, setStats] = useState({
    classes: 0,
    matieres: 0,
    professeurs: 0,
    eleves: 0,
  });


  const loadStats = async() => {
    try {
      const [c, m, p, e] = await Promise.all([
        axios.get('http://localhost:8000/api/classes'),
        axios.get('http://localhost:8000/api/matieres'),
        axios.get('http://localhost:8000/api/professeurs'),
        axios.get('http://localhost:8000/api/eleves')
      ]);

      setStats({
        classes: c.data.length,
        matieres:m.data.length,
        professeurs: p.data.length,
        eleves: e.data.length
      });
    } catch (err) {
      console.error("Erreur de chargement des stats ", err);
    }; 
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    //Verfier l'authentification 
    axios.get('http://localhost:8000/api/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        // si Ok, charger les donnees
        loadStats().finally(() => setLoading(false));
      })
      .catch(() => {
        navigate('/login'); // Rediriger vers la page de connexion si non connecte
      });
  }, [navigate]);
  // fonction de navigation
  const handleCardClick = (route) => {
    navigate(route);
  };

  if(loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <div className="div-dashboard">
    <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-content">
          <h1 className="dashboard-title">Tableau de Bord - Admin</h1>
          <div className="card-grid">
            <InfoCard title="Classes" count={stats.classes} color="#4CAF50" onClick= {() => handleCardClick('/classes')} />
            <InfoCard title="Matieres" count={stats.matieres} color="#2196F3" onClick= {() => handleCardClick('/matieres')}/>
            <InfoCard title="Professeurs" count={stats.professeurs} color="#FF9800" onClick= {() => handleCardClick('/professeurs')} />
            <InfoCard title="Élèves" count={stats.eleves} color="#9C27B0" onClick = {() => handleCardClick('/eleves')} />
          </div>
        </main>
    </div>
    
    </div>
    

  );
};
export default AdminDasboard;
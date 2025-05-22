import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CssStyle/AdminDashboard.css';
import StatsOverview from './StatsOverview';
import ClassesManagement from './ClassesManagement';
import MatieresManagement from './MatieresManagement';
import EmploiTempsManagement from './EmploiTempsManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [classes, setClasses] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [emplois, setEmplois] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classesRes, matieresRes, emploisRes] = await Promise.all([
          axios.get('/api/classes', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }),
          axios.get('/api/matieres', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }),
          axios.get('/api/emplois', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
        ]);
        
        setClasses(classesRes.data);
        setMatieres(matieresRes.data);
        setEmplois(emploisRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <StatsOverview classes={classes} matieres={matieres} emplois={emplois} />;
      case 'classes':
        return <ClassesManagement classes={classes} setClasses={setClasses} />;
      case 'matieres':
        return <MatieresManagement matieres={matieres} setMatieres={setMatieres} />;
      case 'emplois':
        return <EmploiTempsManagement 
          emplois={emplois} 
          setEmplois={setEmplois} 
          classes={classes} 
          matieres={matieres} 
        />;
      default:
        return <StatsOverview classes={classes} matieres={matieres} emplois={emplois} />;
    }
  };

  if (loading) {
    return <div className="loading-spinner">Chargement...</div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>EcoSmart - Administration</h1>
        <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
      </header>
      
      <nav className="dashboard-nav">
        <button 
          className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Vue d'ensemble
        </button>
        <button 
          className={`nav-btn ${activeTab === 'classes' ? 'active' : ''}`}
          onClick={() => setActiveTab('classes')}
        >
          Gestion des Classes
        </button>
        <button 
          className={`nav-btn ${activeTab === 'matieres' ? 'active' : ''}`}
          onClick={() => setActiveTab('matieres')}
        >
          Gestion des Matières
        </button>
        <button 
          className={`nav-btn ${activeTab === 'emplois' ? 'active' : ''}`}
          onClick={() => setActiveTab('emplois')}
        >
          Emplois du Temps
        </button>
      </nav>
      
      <main className="dashboard-content">
        {renderTabContent()}
      </main>
      
      <footer className="dashboard-footer">
        <p>© 2023 EcoSmart - Tous droits réservés</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
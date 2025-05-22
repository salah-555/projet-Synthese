import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Register.css';
import Navbar from '../components/Navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'eleve',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Le prénom est requis';
    if (!formData.lastname.trim()) newErrors.lastname = 'Le nom est requis';
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit avoir au moins 8 caractères';
    }
    
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Les mots de passe ne correspondent pas';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // verfier d'abord si la reponse est ok 
      if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l inscription')
      }
      
      const data = await response.json();
      
      // Registration successful
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      //Redirection en fonction du role 
      switch(data.user.role) {
        case 'admin': 
           navigate('/admin/dashboard');
           break;
        case 'prof':
            navigate('/prof/dashboard');
            break;
        case 'eleve':
          navigate('/eleve/dashboard');
          break;
          default:
            navigate('/eleve/dashboard');
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      setServerError('Une erreur s\'est produite lors de la connexion au serveur');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-page">
        <div className="register-container">
          <h2 className="register-title">Créer un compte</h2>
          
          {serverError && <p className="error-message">{serverError}</p>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Prénom</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastname">Nom de famille</label>
              <input 
                type="text" 
                id="lastname" 
                name="lastname" 
                value={formData.lastname} 
                onChange={handleChange} 
                className={errors.lastname ? 'error' : ''}
              />
              {errors.lastname && <span className="error-text">{errors.lastname}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Adresse Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password_confirmation">Confirmation du mot de passe</label>
              <input 
                type="password" 
                id="password_confirmation" 
                name="password_confirmation" 
                value={formData.password_confirmation} 
                onChange={handleChange} 
                className={errors.password_confirmation ? 'error' : ''}
              />
              {errors.password_confirmation && (
                <span className="error-text">{errors.password_confirmation}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="role">Rôle</label>
              <select 
                id="role" 
                name="role" 
                value={formData.role} 
                onChange={handleChange}
              >
                <option value="eleve">Élève</option>
                <option value="prof">Prof</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="submit-button" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
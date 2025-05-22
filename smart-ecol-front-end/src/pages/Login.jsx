import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles/Login.css';
import Navbar from '../components/Navbar';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email est requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.password) newErrors.password = 'Mot de passe est requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else if (data.message) {
          setLoginError(data.message);
        } else {
          setLoginError('Identifiants invalides');
        }
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      //Redirection en fonction du role de chaque user
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
      console.error('Login error:', error);
      setLoginError('Une erreur est survenue lors de la connexion');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <Navbar />
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h2>Connexion</h2>
            <p>Accédez à votre espace personnel</p>
          </div>
          
          {loginError && <div className="login-error">{loginError}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'form-input error' : 'form-input'}
                placeholder="jean.dupont@exemple.fr"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'form-input error' : 'form-input'}
                placeholder="********"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="rememberMe">Se souvenir de moi</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Mot de passe oublié?
              </Link>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Connexion en cours...' : (
                <>
                  Se connecter
                  <span className="arrow-icon"></span>
                </>
              )}
            </button>

            <div className="register-link">
              <p>
                Pas encore de compte?{' '}
                <Link to="/register" className="register-link-text">
                  S'inscrire
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
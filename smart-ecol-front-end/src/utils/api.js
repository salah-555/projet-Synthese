import axios from 'axios';

// Créer une instance Axios avec les configurations par défaut
const api  = axios.create({

    baseURL: 'http://localhost:8000/api',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
    },
});

// Ajouter automatiquement le token si disponible
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config;
}, error => Promise.reject(error));

export default api;
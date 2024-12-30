import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configurar el token JWT en el encabezado de autorización
export const setAuthToken = token => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Endpoints
export const login = credentials => api.post('/auth/login', credentials);
export const register = data => api.post('/auth/register', data);
export const getTasks = () => api.get('/tasks');
export const createTask = task => api.post('/tasks', task);
export const updateTask = (id, task) => api.put(`/tasks/${id}`, task);
export const deleteTask = id => api.delete(`/tasks/${id}`);

export default api;

// EDUCERA API Service Layer
import axios from 'axios';

const API_BASE = 'http://localhost/educera-backend/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('educera_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('educera_token');
      localStorage.removeItem('educera_user');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ============ AUTH ============
export const registerUser = async (data) => {
  const res = await api.post('/auth.php?action=register', data);
  if (res.data.token) {
    localStorage.setItem('educera_token', res.data.token);
    localStorage.setItem('educera_user', JSON.stringify(res.data.user));
  }
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post('/auth.php?action=login', data);
  if (res.data.token) {
    localStorage.setItem('educera_token', res.data.token);
    localStorage.setItem('educera_user', JSON.stringify(res.data.user));
  }
  return res.data;
};

export const getProfile = async () => {
  const res = await api.get('/auth.php?action=profile');
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await api.post('/auth.php?action=update_profile', data);
  return res.data;
};

export const logout = () => {
  localStorage.removeItem('educera_token');
  localStorage.removeItem('educera_user');
  window.location.href = '/login';
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('educera_user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('educera_token');
};

// ============ TASKS ============
export const getTasks = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await api.get(`/tasks.php?${params}`);
  return res.data;
};

export const getTaskStats = async () => {
  const res = await api.get('/tasks.php?action=stats');
  return res.data;
};

export const createTask = async (data) => {
  const res = await api.post('/tasks.php', data);
  return res.data;
};

export const updateTask = async (id, data) => {
  const res = await api.put(`/tasks.php?id=${id}`, data);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await api.delete(`/tasks.php?id=${id}`);
  return res.data;
};

// ============ ATTENDANCE ============
export const getAttendance = async (month, year, subject = '') => {
  const params = new URLSearchParams({ month, year, ...(subject && { subject }) }).toString();
  const res = await api.get(`/attendance.php?${params}`);
  return res.data;
};

export const getAttendanceStats = async (month, year) => {
  const res = await api.get(`/attendance.php?action=stats&month=${month}&year=${year}`);
  return res.data;
};

export const getMonthlyAttendance = async (year) => {
  const res = await api.get(`/attendance.php?action=monthly&year=${year}`);
  return res.data;
};

export const markAttendance = async (data) => {
  const res = await api.post('/attendance.php', data);
  return res.data;
};

export const updateAttendance = async (id, data) => {
  const res = await api.put(`/attendance.php?id=${id}`, data);
  return res.data;
};

export const deleteAttendance = async (id) => {
  const res = await api.delete(`/attendance.php?id=${id}`);
  return res.data;
};

// ============ NOTES ============
export const getNotes = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await api.get(`/notes.php?${params}`);
  return res.data;
};

export const createNote = async (data) => {
  const res = await api.post('/notes.php', data);
  return res.data;
};

export const updateNote = async (id, data) => {
  const res = await api.put(`/notes.php?id=${id}`, data);
  return res.data;
};

export const deleteNote = async (id) => {
  const res = await api.delete(`/notes.php?id=${id}`);
  return res.data;
};

// ============ SUBJECTS ============
export const getSubjects = async () => {
  const res = await api.get('/subjects.php');
  return res.data;
};

export const createSubject = async (data) => {
  const res = await api.post('/subjects.php', data);
  return res.data;
};

export const deleteSubject = async (id) => {
  const res = await api.delete(`/subjects.php?id=${id}`);
  return res.data;
};

export default api;

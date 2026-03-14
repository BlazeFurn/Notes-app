import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

export const signup = (data) => API.post('/auth/signup', data).then((res) => res.data);
export const login = (data) => API.post('/auth/login', data).then((res) => res.data);
export const getProfile = (token) => API.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data);
export const getNotes = (token) => API.get('/notes', { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data);
export const createNote = (token, data) => API.post('/notes', data, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data);
export const deleteNote = (token, id) => API.delete(`/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data);

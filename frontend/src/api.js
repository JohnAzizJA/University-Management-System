// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/core/', // backend auth base
});

export function setAuthToken(token) {
  if (token) {
    // SimpleJWT expects: "Bearer <access>"
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
}

export function clearAuthToken() {
  delete API.defaults.headers.common['Authorization'];
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  } catch (e) {
    // ignore
  }
}

export default API;

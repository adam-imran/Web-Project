import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Don't redirect on the initial auth check (/auth/me) —
      // that 401 just means "not logged in", which is fine on public pages.
      // Only redirect when a protected action fails mid-session.
      const isAuthCheck = error.config?.url?.includes('/auth/me');
      if (!isAuthCheck && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

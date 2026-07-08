import axios from 'axios';
import Swal from 'sweetalert2';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export async function request({ method = 'get', url, data = {}, params = {}, successMsg } = {}) {
  try {
    const response = await api({ method, url, data, params });
    if (successMsg) {
      Swal.fire({ icon: 'success', title: 'Éxito', text: successMsg, timer: 2000, showConfirmButton: false });
    }
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || 'Error en la solicitud';
    const errors = error.response?.data?.errors;
    if (errors && typeof errors === 'object') {
      const errorList = Object.values(errors).join('<br>');
      Swal.fire({ icon: 'error', title: 'Error', html: errorList });
    } else {
      Swal.fire({ icon: 'error', title: 'Error', text: msg });
    }
    throw error;
  }
}

export default api;

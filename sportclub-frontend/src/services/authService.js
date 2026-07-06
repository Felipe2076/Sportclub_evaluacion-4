import api from './api';

export async function login(email, password) {
  const res = await api.post('/auth/login', { email, password });
  const { token, user } = res.data.data;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  return user;
}

export async function register(data) {
  const res = await api.post('/auth/register', data);
  return res.data;
}

export async function getMe() {
  const res = await api.get('/auth/me');
  return res.data.data;
}

export async function updateProfile(data) {
  const res = await api.put('/auth/me', data);
  return res.data.data;
}

export async function changePassword(current_password, new_password, confirm_password) {
  const res = await api.put('/auth/me/password', { current_password, new_password, confirm_password });
  return res.data;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

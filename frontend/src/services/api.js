import axios from 'axios';

const API_BASE_URL = 'https://llg-foundation-app.onrender.com';

export async function fetchImpactStats() {
  const res = await axios.get(`${API_BASE_URL}/impact-stats`);
  return res.data;
}

export async function registerUser(userData) {
  const res = await axios.post(`${API_BASE_URL}/users/register`, userData);
  return res.data;
}

export async function loginUser(username, password) {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  const res = await axios.post(`${API_BASE_URL}/token`, formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  if (res.data.access_token) {
    localStorage.getItem('token'); // or setItem
    localStorage.setItem('token', res.data.access_token);
  }
  return res.data;
  }


export async function getCurrentUser() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const res = await axios.get(`${API_BASE_URL}/users/me`, {
    headers: { 
      Authorization: `Bearer ${token}` 
    },
  });
  return res.data;
}

export async function submitBeneficiaryRegistration(formData) {
  const res = await axios.post(`${API_BASE_URL}/beneficiaries/register`, formData);
  return res.data;
}

export async function submitCSRPartner(formData) {
  const res = await axios.post(`${API_BASE_URL}/csr/partner`, formData);
  return res.data;
}

export async function fetchAllBeneficiaries() {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_BASE_URL}/admin/beneficiaries`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function fetchAllCSRPartners() {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_BASE_URL}/admin/csr-partners`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}


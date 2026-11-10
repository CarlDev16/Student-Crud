import axios from 'axios';

// When deployed on Render, VITE_API_BASE_URL points to the deployed backend.
// In local development, it defaults to '/mangune/students' to leverage the Vite reverse proxy.
const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && envUrl.trim()) {
    let clean = envUrl.trim().replace(/\/+$/, '');
    if (!/^https?:\/\//i.test(clean)) {
      clean = `https://${clean}`;
    }
    return `${clean}/mangune/students`;
  }
  return '/mangune/students';
};

const API_URL = getBaseUrl();

const studentApi = {
  // GET all students
  getAll: () => axios.get(API_URL),

  // GET student by ID
  getById: (id) => axios.get(`${API_URL}/${id}`),

  // POST create student
  create: (student) => axios.post(API_URL, student),

  // PUT update student
  update: (id, student) => axios.put(`${API_URL}/${id}`, student),

  // DELETE student
  delete: (id) => axios.delete(`${API_URL}/${id}`),

  // GET search by section
  searchBySection: (section) => axios.get(`${API_URL}/search/${section}`),
};

export default studentApi;

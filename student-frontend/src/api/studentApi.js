import axios from 'axios';

const API_URL = '/mangune/students';

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

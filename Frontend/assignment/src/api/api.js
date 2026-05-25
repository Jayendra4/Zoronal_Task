import axios from '../utils/axios.js';

export const companyAPI = {
  getAll: (params) => axios.get('/companies', { params }),
  getOne: (id) => axios.get(`/companies/${id}`),
  create: (data) => axios.post('/companies', data),
};

export const reviewAPI = {
  getByCompany: (companyId, params) => axios.get(`/reviews/company/${companyId}`, { params }),
  create: (data) => axios.post('/reviews', data),
  like: (id) => axios.put(`/reviews/${id}/like`),
};

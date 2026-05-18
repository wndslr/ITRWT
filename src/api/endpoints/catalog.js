import api from '../axios.js'

export const fetchHome = () => api.get('/home')

export const fetchCatalog = (params = {}) => api.get('/catalog', { params })

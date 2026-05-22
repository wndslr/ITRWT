import api from '../axios.js'

export const fetchProduct = (id) => api.get(`/product/${id}`)

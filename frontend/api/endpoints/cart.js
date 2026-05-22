import api from '../axios.js'

export const fetchCart    = ()           => api.get('/cart')
export const addCartItem  = (item)       => api.post('/cart', item)
export const updateCartItem = (id, data) => api.put(`/cart/${id}`, data)
export const deleteCartItem = (id)       => api.delete(`/cart/${id}`)
export const clearCart    = ()           => api.delete('/cart')

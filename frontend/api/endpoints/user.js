import api from '../axios.js'

export const fetchUser  = ()     => api.get('/user')
export const registerUser = (data) => api.post('/user/register', data)

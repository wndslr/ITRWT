import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchUser, registerUser } from '@/api/endpoints/user.js'

export const useUserStore = defineStore('user', () => {
  const user    = ref(null)
  const token   = ref(localStorage.getItem('token') || null)
  const loading = ref(false)
  const error   = ref(null)

  const isLoggedIn = computed(() => !!token.value)

  async function getUser() {
    if (!token.value) return
    loading.value = true; error.value = null
    try { user.value = await fetchUser() }
    catch (e) { error.value = e.message }
    finally { loading.value = false }
  }

  async function registration(formData) {
    loading.value = true; error.value = null
    try {
      const data = await registerUser(formData)
      user.value  = data
      token.value = data.token
      localStorage.setItem('token', data.token)
      return true
    } catch (e) {
      error.value = e.message
      return false
    } finally { loading.value = false }
  }

  function logout() {
    user.value  = null
    token.value = null
    localStorage.removeItem('token')
  }

  return { user, token, loading, error, isLoggedIn, getUser, registration, logout }
})

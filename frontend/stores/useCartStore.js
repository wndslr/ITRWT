import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api/axios.js'

export const useCartStore = defineStore('cart', () => {
  const items    = ref([])
  const loading  = ref(false)
  const error    = ref(null)

  const subTotal   = computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0))
  const grandTotal = computed(() => subTotal.value)
  const itemCount  = computed(() => items.value.reduce((s, i) => s + i.qty, 0))

  const normalize = (data) => {
    items.value = (data.items || []).map(i => ({
      id: i._id,
      productId: i.product,
      title: i.title,
      price: i.price,
      image: i.image,
      color: i.color,
      size: i.size,
      qty: i.qty
    }))
  }

  async function getCart() {
    loading.value = true; error.value = null
    try { normalize(await api.get('/cart')) }
    catch (e) { error.value = e.message }
    finally { loading.value = false }
  }

  async function addToCart(item) {
    loading.value = true; error.value = null
    try { normalize(await api.post('/cart', item)) }
    catch (e) { error.value = e.message }
    finally { loading.value = false }
  }

  async function updateCart(id, payload) {
    loading.value = true; error.value = null
    try { normalize(await api.put(`/cart/${id}`, payload)) }
    catch (e) { error.value = e.message }
    finally { loading.value = false }
  }

  async function deleteFromCart(id) {
    loading.value = true; error.value = null
    try { normalize(await api.delete(`/cart/${id}`)) }
    catch (e) { error.value = e.message }
    finally { loading.value = false }
  }

  async function clearCartAll() {
    loading.value = true; error.value = null
    try { normalize(await api.delete('/cart')) }
    catch (e) { error.value = e.message }
    finally { loading.value = false }
  }

  return { items, loading, error, subTotal, grandTotal, itemCount, getCart, addToCart, updateCart, deleteFromCart, clearCartAll }
})

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchCart, addCartItem, updateCartItem, deleteCartItem, clearCart } from '@/api/endpoints/cart.js'

export const useCartStore = defineStore('cart', () => {
  const items    = ref([])
  const loading  = ref(false)
  const error    = ref(null)

  const subTotal   = computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0))
  const grandTotal = computed(() => subTotal.value)
  const itemCount  = computed(() => items.value.reduce((s, i) => s + i.qty, 0))

  async function getCart() {
    loading.value = true; error.value = null
    try {
      const data = await fetchCart()
      items.value = data.items
    } catch (e) { error.value = e.message }
    finally { loading.value = false }
  }

  async function addToCart(item) {
    loading.value = true; error.value = null
    try {
      const data = await addCartItem(item)
      items.value = data.items
    } catch (e) { error.value = e.message }
    finally { loading.value = false }
  }

  async function updateCart(id, payload) {
    loading.value = true; error.value = null
    try {
      const data = await updateCartItem(id, payload)
      items.value = data.items
    } catch (e) { error.value = e.message }
    finally { loading.value = false }
  }

  async function deleteFromCart(id) {
    loading.value = true; error.value = null
    try {
      const data = await deleteCartItem(id)
      items.value = data.items
    } catch (e) { error.value = e.message }
    finally { loading.value = false }
  }

  async function clearCartAll() {
    loading.value = true; error.value = null
    try {
      const data = await clearCart()
      items.value = data.items
    } catch (e) { error.value = e.message }
    finally { loading.value = false }
  }

  return { items, loading, error, subTotal, grandTotal, itemCount, getCart, addToCart, updateCart, deleteFromCart, clearCartAll }
})

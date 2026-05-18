import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchProduct } from '@/api/endpoints/product.js'

export const useProductStore = defineStore('product', () => {
  const product = ref(null)
  const related = ref([])
  const loading = ref(false)
  const error   = ref(null)

  async function getProduct(id) {
    loading.value = true; error.value = null; product.value = null
    try {
      const data = await fetchProduct(id)
      product.value = data
      related.value = data.related || []
    } catch (e) { error.value = e.message }
    finally { loading.value = false }
  }

  return { product, related, loading, error, getProduct }
})

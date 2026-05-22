import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api/axios.js'

export const useProductStore = defineStore('product', () => {
  const product = ref(null)
  const related = ref([])
  const loading = ref(false)
  const error = ref(null)

  const normalize = (p) => ({
    id: p._id,
    title: p.title,
    desc: p.description,
    price: p.price,
    image: p.image,
    color: p.colors?.[0] || 'Red',
    size: p.sizes?.[0] || 'M',
    collection: p.productCollection || 'WOMEN COLLECTION'
  })

  async function getProduct(id) {
    loading.value = true; error.value = null; product.value = null
    try {
      const data = await api.get(`/product/${id}`)
      product.value = normalize(data)
      const rel = await api.get('/product', { params: { limit: 3 } })
      related.value = rel.items.map(normalize)
    } catch (e) { error.value = e.message }
    finally { loading.value = false }
  }

  return { product, related, loading, error, getProduct }
})

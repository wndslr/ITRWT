import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchCatalog, fetchHome } from '@/api/endpoints/catalog.js'

export const useCatalogStore = defineStore('catalog', () => {
  const homeData   = ref(null)

  const items      = ref([])
  const page       = ref(1)
  const totalPages = ref(1)
  const total      = ref(0)
  const filters    = ref({ category: '', size: '' })
  const loading    = ref(false)
  const error      = ref(null)

  async function getHome() {
    loading.value = true; error.value = null
    try { homeData.value = await fetchHome() }
    catch (e) { error.value = e.message }
    finally { loading.value = false }
  }

  async function getCatalog(params = {}) {
    loading.value = true; error.value = null
    try {
      const merged = { page: page.value, limit: 6, ...filters.value, ...params }
      Object.keys(merged).forEach(k => merged[k] === '' && delete merged[k])
      const data = await fetchCatalog(merged)
      items.value      = data.items
      page.value       = data.page
      totalPages.value = data.totalPages
      total.value      = data.total
    } catch (e) { error.value = e.message }
    finally { loading.value = false }
  }

  function setFilter(key, value) {
    filters.value[key] = value
    page.value = 1
    getCatalog()
  }

  function setPage(p) {
    page.value = p
    getCatalog()
  }

  return { homeData, items, page, totalPages, total, filters, loading, error, getHome, getCatalog, setFilter, setPage }
})

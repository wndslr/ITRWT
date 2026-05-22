import api from '../axios.js'

export const fetchHome = async () => {
  const [catalogData, productsData] = await Promise.all([
    api.get('/catalog'),
    api.get('/product', { params: { page: 1, limit: 6 } })
  ])
  return {
    offers: [
      { id: 1, mod: 'women',       label: 'WOMEN',       discount: '30% OFF' },
      { id: 2, mod: 'men',         label: 'MEN',         discount: '30% OFF' },
      { id: 3, mod: 'kids',        label: 'KIDS',        discount: '30% OFF' },
      { id: 4, mod: 'accessories', label: 'ACCESSORIES', discount: '30% OFF' }
    ],
    featured: productsData.items.map(p => ({
      id: p._id,
      title: p.title,
      desc: p.description,
      price: p.price,
      image: p.image,
      color: p.colors?.[0] || 'Red',
      size: p.sizes?.[0] || 'M'
    }))
  }
}

export const fetchCatalog = (params = {}) => api.get('/catalog', { params })

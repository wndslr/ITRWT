import MockAdapter from 'axios-mock-adapter'
import instance from './axios.js'

const mock = new MockAdapter(instance, { delayResponse: 200 })

const PRODUCTS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: "ELLERY X M'O CAPSULE",
  desc: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.',
  price: 52,
  color: ['Red', 'Blue', 'Black', 'White'][i % 4],
  size: ['XS', 'S', 'M', 'L', 'XL'][i % 5],
  category: ['Accessories', 'Bags', 'Denim', 'Shirts', 'T-Shirts'][i % 5],
  image: `/img/product-${((i + 4) % 6) + 1}.png`
}))

const HERO_DATA = {
  offers: [
    { id: 1, mod: 'women',       label: 'WOMEN',       discount: '30% OFF' },
    { id: 2, mod: 'men',         label: 'MEN',         discount: '30% OFF' },
    { id: 3, mod: 'kids',        label: 'KIDS',        discount: '30% OFF' },
    { id: 4, mod: 'accessories', label: 'ACCESSORIES', discount: '30% OFF' }
  ],
  featured: PRODUCTS.slice(0, 6)
}

let CART = []

const cartResp = () => ({ items: CART, subTotal: CART.reduce((s, i) => s + i.price * i.qty, 0) })

const USER = { id: 1, firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', gender: 'female' }

mock.onGet('/home').reply(200, HERO_DATA)

mock.onGet('/catalog').reply((config) => {
  const { page = 1, limit = 6, category, size } = config.params || {}
  let items = [...PRODUCTS]
  if (category) items = items.filter(p => p.category === category)
  if (size)     items = items.filter(p => p.size === size)
  const total = items.length
  return [200, {
    items: items.slice((page - 1) * limit, page * limit),
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    total
  }]
})

mock.onGet(/^\/product\/\d+$/).reply((config) => {
  const id = Number(config.url.split('/')[2])
  const p  = PRODUCTS.find(x => x.id === id)
  if (!p) return [404, { message: 'Not found' }]
  return [200, { ...p, collection: 'WOMEN COLLECTION', related: PRODUCTS.slice(0, 3) }]
})

mock.onGet('/cart').reply(() => [200, cartResp()])

mock.onPost('/cart').reply((config) => {
  const body = JSON.parse(config.data)
  const hit  = CART.find(i => i.productId === body.productId && i.size === body.size && i.color === body.color)
  if (hit) { hit.qty += body.qty || 1 }
  else      { CART.push({ id: Date.now(), ...body }) }
  
  return [200, cartResp()]
})

mock.onPut(/^\/cart\/\d+$/).reply((config) => {
  const id   = Number(config.url.split('/')[2])
  const body = JSON.parse(config.data)
  const item = CART.find(i => i.id === id)
  if (!item) return [404, { message: 'Not found' }]
  Object.assign(item, body)
  
  return [200, cartResp()]
})

mock.onDelete(/^\/cart\/\d+$/).reply((config) => {
  const id = Number(config.url.split('/')[2])
  CART = CART.filter(i => i.id !== id)
  
  return [200, cartResp()]
})

mock.onDelete('/cart').reply(() => {
  CART = []
  
  return [200, { items: [], subTotal: 0 }]
})

mock.onGet('/user').reply(200, USER)
mock.onPost('/user/register').reply((config) => {
  const body = JSON.parse(config.data)
  if (!body.email || !body.password) return [422, { message: 'Email and password required' }]
  return [201, { ...USER, ...body, id: Date.now(), token: 'fake-jwt-token' }]
})

export default mock

import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from './db.js'
import Catalog from './models/catalog.model.js'
import Product from './models/product.model.js'
import User from './models/user.model.js'

await connectDB()

await Promise.all([
  Catalog.deleteMany({}),
  Product.deleteMany({}),
  User.deleteMany({})
])

const categories = await Catalog.insertMany([
  { name: 'Accessories', slug: 'accessories', order: 1 },
  { name: 'Bags',        slug: 'bags',        order: 2 },
  { name: 'Denim',       slug: 'denim',       order: 3 },
  { name: 'Shirts',      slug: 'shirts',      order: 4 },
  { name: 'T-Shirts',    slug: 't-shirts',    order: 5 }
])

const products = []
for (let i = 0; i < 20; i++) {
  products.push({
    title: "ELLERY X M'O CAPSULE",
    description: 'Known for her sculptural takes on traditional tailoring.',
    price: 52,
    image: `/img/product-${((i + 4) % 6) + 1}.png`,
    category: categories[i % categories.length]._id,
    productCollection: 'WOMEN COLLECTION',
    colors: ['Red', 'Blue', 'Black'],
    sizes:  ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    quantity: 100
  })
}
await Product.insertMany(products)

await User.create({
  firstName: 'Demo',
  lastName:  'User',
  email:     'demo@example.com',
  password:  'demo12345',
  gender:    'female',
  role:      'user'
})

await User.create({
  firstName: 'Admin',
  lastName:  'Root',
  email:     'admin@example.com',
  password:  'admin12345',
  gender:    'other',
  role:      'admin'
})

console.log(`Seeded: ${categories.length} categories, ${products.length} products, 2 users`)
console.log('Demo:  demo@example.com  / demo12345')
console.log('Admin: admin@example.com / admin12345')
await mongoose.connection.close()

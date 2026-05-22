import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.route.js'
import catalogRoutes from './routes/catalog.route.js'
import productRoutes from './routes/product.route.js'
import cartRoutes from './routes/cart.route.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({
    name: 'ITRWT API',
    version: '1.0.0',
    endpoints: ['/api/user', '/api/catalog', '/api/product', '/api/cart']
  })
})

app.use('/api/user', userRoutes)
app.use('/api/catalog', catalogRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)

app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.originalUrl })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error', message: err.message })
})

export default app

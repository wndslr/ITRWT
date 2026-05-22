import { Router } from 'express'
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js'
import { authRequired, adminOnly } from '../middleware/auth.js'

const router = Router()

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', authRequired, adminOnly, createProduct)
router.put('/:id', authRequired, adminOnly, updateProduct)
router.delete('/:id', authRequired, adminOnly, deleteProduct)

export default router

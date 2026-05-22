import { Router } from 'express'
import {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart
} from '../controllers/cart.controller.js'
import { authRequired } from '../middleware/auth.js'

const router = Router()

router.use(authRequired)

router.get('/', getCart)
router.post('/', addToCart)
router.put('/:id', updateCartItem)
router.delete('/:id', deleteCartItem)
router.delete('/', clearCart)

export default router

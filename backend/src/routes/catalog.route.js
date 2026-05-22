import { Router } from 'express'
import { getCatalog, getCategories, createCategory } from '../controllers/catalog.controller.js'
import { authRequired, adminOnly } from '../middleware/auth.js'

const router = Router()

router.get('/', getCatalog)
router.get('/categories', getCategories)
router.post('/', authRequired, adminOnly, createCategory)

export default router

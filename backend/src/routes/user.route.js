import { Router } from 'express'
import { getUser, getMe, registerUser, loginUser } from '../controllers/user.controller.js'
import { authRequired, adminOnly } from '../middleware/auth.js'

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', authRequired, getMe)
router.get('/', authRequired, adminOnly, getUser)

export default router

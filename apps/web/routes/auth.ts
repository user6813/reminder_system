import { Router } from 'express'
import { Login, Logout, Register } from '../controllers/auth'
import AuthMiddleware from '../utils/auth'

const router = Router()

router.post('/register', Register)

router.post('/login', Login)

router.post('/logout', AuthMiddleware, Logout)

export default router